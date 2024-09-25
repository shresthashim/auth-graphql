import { prisma } from "../../lib/script";
import UserService, { CreateUserPayload } from "../../services/user.service";

const queries = {
  hello: () => "Hello, world!",
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const newUser = await UserService.createUser(payload);
    return newUser.id;
  },
};

export const resolvers = {
  queries,
  mutations,
};
