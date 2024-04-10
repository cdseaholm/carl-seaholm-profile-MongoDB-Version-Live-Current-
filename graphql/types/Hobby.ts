import { builder } from "../builder";
import {prisma} from "@/db";

builder.prismaObject("Hobby", {
    fields: (t) => ({
        id: t.exposeID('id'),
        title: t.exposeString('title'),
        date: t.exposeStringList('date'),
        description: t.exposeStringList('descriptions'),
        minutesXsession: t.exposeStringList('minutesXsession'),
        category: t.exposeStringList('category'),
        goal: t.exposeStringList('goal'),
        user: t.relation('user'),
        userId: t.exposeInt('userId'),
    })
});

builder.queryField('hobbies', (t) => 
    t.prismaField({
        type: ['Hobby'],
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.hobby.findMany({ ...query })
        
    })
);
