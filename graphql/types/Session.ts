import { builder } from "../builder";
import {prisma} from "@/db";
  
builder.prismaObject("Session", {
    fields: (t) => ({
        id: t.exposeID('id'),
        userId: t.exposeInt('userId'),
        user: t.relation('user'),
    })
});

builder.queryField('sessions', (t) => 
    t.prismaField({
        type: ['Session'],
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.session.findMany({ ...query })
        
    })
);