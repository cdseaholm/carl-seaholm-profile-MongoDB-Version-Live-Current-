import Subscriber from "@/lib/models/subscribers";
import dbConnect from "@/utils/mongodb";


export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    if (!body.subEmail) {
        return Response.json({status: 400, error: 'Email are required' });
    }
    const alreadySubbed = await Subscriber.findOne({ email: body.subemail });
    if (alreadySubbed) {
        return Response.json({status: 409, error: 'You are already subscribed' });
    }
    const newSub = await new Subscriber({
        email: body.subEmail,
        name: body.subName,
        subscribed: true,
        subscribedAt: new Date(),
    })
    const subSave = await newSub.save();
    if (!subSave) {
        return Response.json({status: 500, error: 'Error saving subscriber' });
    }
    return Response.json({status: 200, message: 'Subscriber added successfully' });
}