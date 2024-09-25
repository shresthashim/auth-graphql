import { prisma } from "../../lib/script";

const queries = {
  hello: () => "Hello, world!",
};

const mutations = {
  createUser: async (_: any, { name, email, password }: { name: string; email: string; password: string }) => {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        salt: "heythere",
      },
    });
    return newUser;
  },
};

export const resolvers = {
  queries,
  mutations,
};
