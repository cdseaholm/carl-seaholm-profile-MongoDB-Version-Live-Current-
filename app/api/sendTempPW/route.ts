import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const email = data.email;
    if (!email) {
        return NextResponse.json({ error: 'Email is required', status: 400 });
    }
    const tempPW = Math.random().toString(36).slice(-8);
    try {
        const body = await connectDB();
        if (!body) {
            return NextResponse.json({ error: 'Database connection error', status: 500 });
        }
        const user = await User.findOneAndUpdate({ email }, { password: tempPW }, { new: true });
        if (!user) {
            return NextResponse.json({ error: 'User not found', status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }


    
    const transport = nodemailer.createTransport({
        service: 'gmail',
        /* 
          setting service as 'gmail' is same as providing these setings:
          host: "smtp.gmail.com",
          port: 465,
          secure: true
          If you want to use a different email provider other than gmail, you need to provide these manually.
          Or you can go use these well known services and their settings at
          https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
      */
        auth: {
            user: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
            pass: process.env.NEXT_APP_PW,
        },
    });

    const mailOptions: Mail.Options = {
        from: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
        to: email,
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: `Message from ${email}`,
        text: `Your temporary password is ${tempPW}`,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        const response = NextResponse.json({ message: 'Email sent', status: 200 });
        response.headers.set('Access-Control-Allow-Origin', '*');
        return response;
    } catch (err) {
        return NextResponse.json({ error: err, status: 500 });
    }
}