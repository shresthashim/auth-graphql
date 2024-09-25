import UserService, { CreateUserPayload, LoginPayload } from "../../services/user.service";

const queries = {
  loginUser: async (_: any, payload: LoginPayload) => {
    const token = await UserService.loginUser(payload);
    return token; 
  },
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
