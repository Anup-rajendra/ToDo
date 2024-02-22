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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Create a new Password</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Current Password</Label>
                <Input id="name" placeholder="your current password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">New Password</Label>
                <Input id="name" placeholder="your new password" />
              </div>
            </div>
          </form>
          <p className="text-muted-foreground text-xs">
            Use 6 Or More Characters To Create The New Password
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Link href="/">
            <Button>Save Changes</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
