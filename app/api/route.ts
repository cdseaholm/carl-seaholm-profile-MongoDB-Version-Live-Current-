

import hobby from '@/lib/models/hobby';
import connectdb from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  await connectdb();
  const cursor = await hobby.find();
  const hobbiesToPass = cursor.map((hobby: any) => {
      return {
          id: hobby._id.toString(), 
          title: hobby.title, 
          dates: hobby.dates, 
          descriptions: hobby.descriptions, 
          minutesXsessions: hobby.minutesXsessions, 
          categories: hobby.categories, 
          goals: hobby.goals, 
          user_email: hobby.user_email
      }
  })

  return Response.json(hobbiesToPass);
}

export async function POST(request: Request) {
  const client = await connectdb();
    const body = await request.json();
    const cursor = await client.db("csPortfolio").collection("users").insertOne({firstName: body.firstName, lastName: body.lastName, email: body.email});
    return Response.json({message: 'User added successfully'});
}

export async function PUT(request: Request) {
  const client = await connectdb();
  const body = await request.json();
  if (!body.id) {
    return Response.json({message: 'No user id provided'})
  } else {
    const cursor = await client.db("csPortfolio").collection("users").updateOne({_id: new ObjectId(body.id as string)}, {$set: {firstName: body.firstName, lastName: body.lastName, email: body.email}});
    return Response.json({message: 'User updated successfully'});
  }
}