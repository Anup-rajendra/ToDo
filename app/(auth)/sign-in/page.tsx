"use client";
import { LoginForm } from "@/components/Login";
import { SignUpForm } from "@/components/Sign";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div>
      <p className="text-center pb-6 text-primary text-4xl">Welcome Back!</p>
      <div className="w-[400px]  border-2 p-4 border-primary">
        <CardHeader>
          <CardTitle className="flex justify-center">Login</CardTitle>
        </CardHeader>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
