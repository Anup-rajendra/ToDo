import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]  border-2 border-primary">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>Please Enter Your E-mail </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">E-mail</Label>
                <Input id="name" placeholder="your email" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/password/reset">
            <Button>Request Password Reset</Button>
          </Link>
          <Link href="/">
            <p className="text-primary text-xs font-medium">Back To Sign-In</p>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
