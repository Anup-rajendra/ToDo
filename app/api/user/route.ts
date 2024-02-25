import { error } from "console";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { z } from "zod";
import { useForm } from "react-hook-form";
const userSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(100),
  firstname: z
    .string()
    .min(1, {
      message: "Firstname is required",
    })
    .max(100),
  lastname: z.string().min(1, {
    message: "Lastname is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Please enter a valid email address.",
    })
    .email("Invalid Email"),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .min(5, {
      message: "Password must have 8 characters",
    }),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, firstname, lastname, email, password } =
      userSchema.parse(body);
    //Check if email exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this Username already exists" },
        { status: 409 }
      );
    }
    const hashpassword = createHash("sha256").update(password).digest("hex");
    const newUser = await db.user.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password: hashpassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
