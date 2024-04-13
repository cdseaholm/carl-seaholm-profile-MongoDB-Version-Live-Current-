import connectdb from '@/utils/mongodb';

export async function GET(request: Request) {
    const client = await connectdb();
    const body = await request.json();
    const hobbies = await client.db("csPortfolio").collection("hobbies").find({user_email: body.userEmail}).toArray();
    if (hobbies.length === 0) {
        return {
            error: 'No hobbies found',
        };
    } else { 
        return Response.json(hobbies);
    }
}