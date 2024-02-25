"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter a valid email address.",
    })
    .email("Invalid Email"),
});
export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    if (session?.user.email === value.email) {
      router.push("/password/reset");
      session.user.email=value.email;
    } else {
      toast("Request Failed", {
        description: "The Entered E-mail does not exist",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Toaster />
      <Card className="w-[350px]  border-2 border-primary">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>Please Enter Your E-mail </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 "
            >
              <Label htmlFor="email">E-mail</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id="email" placeholder="Your E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Request Password Reset</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/">
            <p className="text-primary text-xs font-medium">Back To Sign-In</p>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
