
import connect from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    const client = await connect;
    const cursor = client.db("csPortfolio").collection("users").find();
    const users = await cursor.toArray();
    const usersToPass = users.map((user) => {
        return {id: user.id.toString(), firstName: user.firstName, lastName: user.lastName, email: user.email, blogsub: user.blogsub, password: user.password}
    })

    return Response.json(usersToPass);
}

export async function POST(request: Request) {
    const client = await connect;
    const body = await request.json();
    const cursor = await client.db("csPortfolio").collection("users").insertOne({firstName: body.firstName, lastName: body.lastName, email: body.email});
    return Response.json({message: 'User added successfully'});
}

export async function PUT(request: Request) {
  const client = await connect;
  const body = await request.json();
  if (!body.id) {
    return Response.json({message: 'No user id provided'})
  } else {
    const cursor = await client.db("csPortfolio").collection("users").updateOne({_id: new ObjectId(body.id as string)}, {$set: {firstName: body.firstName, lastName: body.lastName, email: body.email}});
    return Response.json({message: 'User updated successfully'});
  }
}