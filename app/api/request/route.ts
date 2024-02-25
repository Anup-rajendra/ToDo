    import { db } from "@/lib/db";
    import { NextResponse } from "next/server";
    import { z } from "zod";
    import { useForm } from "react-hook-form";
    import { getServerSession } from "next-auth";
    import { authOptions } from "@/lib/auth";
    import { createHash } from "crypto";
    const userSchema = z.object({
    password: z
        .string()
        .min(1, {
        message: "Password is required",
        })
        .min(5, {
        message: "Password must have 6 characters",
        }),
    confirmpassword: z
        .string()
        .min(1, {
        message: "Password is required",
        })
        .min(5, {
        message: "Password must have 6 characters",
        }),
    });
    export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { password, confirmpassword } = userSchema.parse(body);
        const session = await getServerSession(authOptions);
        if (!session?.user.email) {
        return NextResponse.json({
            success: false,
            message: `Something went wrong: Email is not in the session `,
            status: 500,
        });
        }
        const existingUserByEmail = await db.user.findUnique({
        where: { email: session.user.email },
        });
        const hashpassword = createHash("sha256").update(password).digest("hex");
        if (existingUserByEmail) {
        const newUser = await db.user.update({
            where: { email: session.user.email },
            data: {
            password: hashpassword,
            },
        });
        }
        return NextResponse.json(
        { message: "The Password is updated" },
        { status: 200 }
        );
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({
        success: false,
        message: `Something went wrong: ${error}`,
        status: 500,
        });
    }
    }
