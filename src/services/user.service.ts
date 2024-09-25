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

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword, // Save the hashed password
        salt: salt, // Save the salt
      },
    });
  }
}

export default UserService;
