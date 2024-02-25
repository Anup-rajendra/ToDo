// Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const FormSchema = z.object({
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
      message: "Password must have 6 characters",
    }),
});

export const SignUpForm = () => {
  const router = useRouter();
  const formone = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("api/user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      }),
    });
    if (response.ok) {
      router.push("/sign-in");
    } else {
      toast("Registration Failed", {
        description: "User with this Username or Email already exists",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      console.error("Registration Failed");
    }
  };
  return (
    <Form {...formone}>
      <form
        onSubmit={formone.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 "
      >
        <FormField
          control={formone.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id="Username" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3 justify-even">
          <FormField
            control={formone.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input id="Firstname" placeholder="Firstname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formone.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input id="Lastname" placeholder="Lastname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={formone.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id="E-mail" placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formone.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id="password" placeholder="Set A Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Get Started</Button>
        <p className="text-center text-sm text-gray-600 mt-2">
          If you already have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};
