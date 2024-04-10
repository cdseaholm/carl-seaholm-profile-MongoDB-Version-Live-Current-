import { builder } from "./builder";
import '@/graphql/types/User';
import '@/graphql/types/Session';
import '@/graphql/types/Hobby';

export const schema = builder.toSchema()