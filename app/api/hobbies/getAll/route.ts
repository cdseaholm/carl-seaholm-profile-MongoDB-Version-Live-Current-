
import hobby from '@/lib/models/hobby';
import connectdb from '@/utils/mongodb';

export async function GET(request: Request) {
  await connectdb();
  const cursor = await hobby.find();
  console.log(cursor);
  if (!cursor) {
    return Response.json({status: 400, message: 'No hobbies found'});
  }
  const hobbiesToPass = cursor.map((hobby: any) => {
      return {
          title: hobby.title, 
          dates: hobby.dates, 
          descriptions: hobby.descriptions, 
          minutesXsessions: hobby.minutesXsessions, 
          categories: hobby.categories, 
          goals: hobby.goals, 
          user_email: hobby.user_email
      }
  })
  
  return new Response(JSON.stringify({hobbiesToPass}));
  
}
