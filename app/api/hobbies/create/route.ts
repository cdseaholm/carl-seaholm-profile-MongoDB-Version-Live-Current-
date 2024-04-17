
import connectdb from "@/utils/mongodb";
import hobby from "@/lib/models/hobby";


export async function POST(request: Request) {

    await connectdb();
    const data = await request.json();
    const hobbyToAdd = await hobby.create({
        title: data.title,
        description: data.description,
        user_email: data.email,
        goals: data.goals,
        minutesXsessions: data.minutesXsessions,
        dates: data.dates,
        color: data.color,
    });
    if (!hobbyToAdd) {
        return Response.json({status: 500, message: 'Error creating hobby'});
    }
    return Response.json({status: 200});
}