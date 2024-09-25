import { prisma } from "../lib/script";
import bcrypt from "bcrypt";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { name, email, password } = payload;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword, 
      },
    });
  }
}

export default UserService;
