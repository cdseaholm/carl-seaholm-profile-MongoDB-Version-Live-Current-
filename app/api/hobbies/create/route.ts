import { validateRequest } from "@/lib/auth";
import connectdb from "@/utils/mongodb";


export async function POST(request: Request) {
    const { session } = await validateRequest();
    
    if (!session) {
        return {
            error: 'Unauthorized',
        };
    }
    const client = await connectdb();
    const data = await request.json();
    const hobby = await client.connect("csPortfolio").collection("hobbies").insertOne({
        title: data.title,
        description: data.description,
        user_email: session.userId,
        goals: data.goals,
        minutesXsessions: data.minutesXsessions,
        dates: data.dates,
    });
    if (!hobby) {
        return {
            error: 'Hobby not created',
        };
    }
    return Response.json({status: 200});
}