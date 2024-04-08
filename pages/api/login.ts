'use server'

import { lucia, prisma } from "@/db";
import { Scrypt, generateId } from "lucia";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { loginEmail: email, loginPassword: password } = req.body;
    if (req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    } else {
        try {
                if (!email || !password) {
                    res.status(401).json({error: 'Invalid email or password'});
                    console.log('Failed 1')
                    return;
                } else if (typeof email !== "string" || email.length < 6 || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email)) {
                    res.status(402).json({error: 'Invalid email'});
                    console.log('Failed 2')
                    return;
                } else if (typeof password !== "string" || password.length < 6 || password.length > 255) {
                    res.status(403).json({error: 'Invalid password'});
                    console.log('Failed 3')
                    return;
                } else {
                    try {
                        const userCheck = await prisma.user.findFirst({
                            where: {
                                email: email
                            },
                        });
                        console.log('userCheck', userCheck);
                        if (!userCheck) {
                            res.status(405).json({error: 'User not found'});
                            return;
                        } else {
                            
                            
                                const validPassword = await new Scrypt().verify(userCheck.password, password);
                                if (!validPassword) {
                                    res.status(401).json({error: 'Password is incorrect'});
                                    return;
                                }

                                const sessionID = generateId(15);
                                
                                const session = await prisma.session.create({
                                    data: {
                                        id: sessionID,
                                        userId: userCheck.id,
                                        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                                    }
                                });
                                const sessionCookie = lucia.createSessionCookie(session.id);
                                res.setHeader('Set-Cookie', `${sessionCookie.name}=${sessionCookie.value}; path=${sessionCookie.attributes.path}; expires=${sessionCookie.attributes.expires};`);
                                //potential to not make user log in constantly ~~C
                            
                                res.json({user: userCheck, session: session});
                                return;
                            
                        }
                    } catch (error: any) {
                        console.error('Database error:', error);
                        res.status(500).json({error: 'Database error: ' + error.message});
                        return;
                    }
                }
            } catch (error: any) {
                console.error('An error occurred:', error);
                res.status(500).json({error: 'An error occurred: ' + error.message});
                return;
            } 
    }
        }