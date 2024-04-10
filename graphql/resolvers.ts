import {prisma} from "@/db";

export const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany();
        },
        user: (id: number) => {
            return prisma.user.findUnique({
                where: { id: Number(id) },
            });
        },
        hobbies: () => {
            return prisma.hobby.findMany();
        },
        hobby: (id: number) => {
            return prisma.hobby.findUnique({
                where: { id: id },
            });
        },
        sessions: () => {
            return prisma.session.findMany();
        },
        session: (id: number) => {
            return prisma.session.findUnique({
                where: { id: Number(id).toString() },
            });
        },
    },
  }