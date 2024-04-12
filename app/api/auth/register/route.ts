import connect from '@/utils/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const client = await connect;
    const body = await request.json();
    const existingUser = await client.db("csPortfolio").collection("users").findOne({
        email: body.registerEmail
    });
    if (existingUser) {
        return Response.json({status: 409, message: 'User already exists'});
    }

    const makeSalty = async function(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
    if (!body.registerPassword) {
        return Response.json({status: 400, message: 'Password is required'});
    }
    const hashedPassword = await makeSalty(body.registerPassword);

    const user = await client.db("csPortfolio").collection("users").insertOne({
        firstName: body.registerfirstName, 
        lastName: body.registerlastName, 
        email: body.registerEmail, 
        blogsub: body.registerBlogsub ? true : false, 
        password: hashedPassword
    });

    console.log(user);

    const userToPass = {
        id: user.insertedId,
        firstName: body.registerfirstName, 
        lastName: body.registerlastName, 
        email: body.registerEmail, 
        blogsub: body.registerBlogsub ? true : false
    };

    return Response.json({status: 200, user: userToPass});
}