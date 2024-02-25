"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignUpForm } from "@/components/Sign";
const page = () => {
  return (
    <div className="w-[400px]  border-2 p-4 border-primary">
      <CardHeader>
        <CardTitle className="flex justify-center">Sign Up For Free</CardTitle>
      </CardHeader>
      <SignUpForm />
    </div>
  );
};

export default page;
