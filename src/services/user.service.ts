import { prisma } from "../lib/script";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { name, email, password } = payload;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  public static async loginUser(payload: LoginPayload) {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    return token;
  }
}

export default UserService;
