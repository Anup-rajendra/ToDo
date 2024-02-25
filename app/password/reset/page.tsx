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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
const FormSchema = z.object({
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

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.password == data.confirmpassword) {
      try {
        const response = await fetch("/api/request", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            password: data.password,
            confirmpassword: data.confirmpassword,
          }),
        });
        if (response.ok) {
          toast("Password Change Successful", {
            description: "Click on Home button to go to home page",
            action: {
              label: "Home",
              onClick: () => router.push("/sign-in"),
            },
          });
        } else {
          console.log;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast("Password Change Failed", {
        description: "Type in the same Passwords in both fields.Try again",
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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Create a new Password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 "
            >
              <Label htmlFor="password">New Password</Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="confirmpassword"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-muted-foreground text-xs">
                Use 6 Or More Characters To Create The New Password
              </p>

              <CardFooter className="flex justify-between">
                <Link href="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
