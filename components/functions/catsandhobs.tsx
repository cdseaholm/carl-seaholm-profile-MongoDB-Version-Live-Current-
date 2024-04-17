import { Hobby } from "@/lib/types/hobby";

export default async function CatsAndHobs({hobbies}: {hobbies: Hobby[]}): Promise<{cats: string[]; hobbes: string[]}> {
        var cats: string[] = [].sort();
        var hobbes = hobbies.map((item) => item.title);
   
        hobbies.map((item) => { 
            for (let i = 0; i < item.categories.length; i++) {
                if (item.categories[i] in cats !== true) {
                    cats.push(item.categories[i]);
                }
            };
        });



    return {cats, hobbes};
}