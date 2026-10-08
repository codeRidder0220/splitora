import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";


interface AuthTokenPayload {
  userId: string;
}

export function createAuthToken(userId: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyAuthToken(token: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const decoded = jwt.verify(token, secret);

  if (
    typeof decoded === "object" &&
    decoded !== null &&
    "userId" in decoded &&
    typeof decoded.userId === "string"
  ) {
    return decoded.userId;
  }

  return null;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("splitora_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const userId = verifyAuthToken(token);

    if (!userId) {
      return null;
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch {
    return null;
  }
}