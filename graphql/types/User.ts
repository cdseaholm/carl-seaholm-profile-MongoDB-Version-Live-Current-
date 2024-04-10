import { builder } from "../builder";
import {prisma} from "@/db";

builder.prismaObject("User", {
    fields: (t) => ({
        id: t.exposeID('id'),
        email: t.exposeString('email'),
        password: t.exposeString('password'),
        sessions: t.relation('sessions'),
        hobbies: t.relation('hobbies'),
        role: t.expose('role', {type: Role}),
        name: t.exposeString('name', {nullable: true}),
        blogsub: t.exposeBoolean('blogsub'),
        image: t.exposeString('image', {nullable: true}),
    })
});

const Role = builder.enumType('Role', {
    values: ['USER', 'ADMIN'] as const,
});

builder.queryField('users', (t) => 
    t.prismaField({
        type: ['User'],
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.user.findMany({ ...query })
        
    })
);