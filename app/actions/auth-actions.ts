"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, comparePassword, } from "@/lib/password";
import { cookies } from "next/headers";
import { createAuthToken } from "@/lib/auth";


//signup --->
export async function signup(
    name: string,
    email: string,
    password: string
) {
    await connectDB();

    const existingUser = await User.findOne({
        email: email.toLowerCase(),
    });

    if (existingUser) {
        return {
            success: false,
            message: "User already exists",
        };
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
    });

    return {
        success: true,
        userId: user._id.toString(),
    };
}

//login -->
export async function login(
    email: string,
    password: string
) {
    await connectDB();

    const user = await User.findOne({
        email: email.toLowerCase(),
    });

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password",
        };
    }

    const passwordMatch = await comparePassword(
        password,
        user.password
    );

    if (!passwordMatch) {
        return {
            success: false,
            message: "Invalid email or password",
        };
    }

    const token = createAuthToken(
        user._id.toString()
    );

    const cookieStore = await cookies();

    cookieStore.set("splitora_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return {
        success: true,
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
    };
}

//logout -->
export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("splitora_token");

  return {
    success: true,
  };
}