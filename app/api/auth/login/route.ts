import connect from '@/utils/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const client = await connect;
    const body = await request.json();
    const user = await client.db("csPortfolio").collection("users").findOne({email: body.loginEmail});
    if (!user) {
        return Response.json({status: 404, message: 'No user found'})
    } else {
        const passwordMatch = await bcrypt.compare(body.loginPassword, user.password);
        if (!passwordMatch) {
            return Response.json({status: 402, message: 'Password is incorrect'})
        } else {
            const userToPass = {
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email, 
                blogsub: user.blogsub
            }

            return Response.json({status: 200, userToPass});
        }
    }
}