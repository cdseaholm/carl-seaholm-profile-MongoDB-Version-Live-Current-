import { Hobby } from "@/types/hobby";

export default async function CatsAndHobs({hobbies}: {hobbies: Hobby[]}): Promise<{cats: string[]; hobbes: string[]}> {
        var cats: string[] = [].sort();
        var hobbes = hobbies.map((item) => item.title);
   
        hobbies.map((item) => { 
            for (let i = 0; i < item.category.length; i++) {
                if (item.category[i] in cats !== true) {
                    cats.push(item.category[i]);
                }
            };
        });



    return {cats, hobbes};
}