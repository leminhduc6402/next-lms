"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyBody, VerifyBodyType } from "@/lib/schemaValidation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { sendRequest } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Verify = ({ id }: { id: string }) => {
  const router = useRouter();
  const form = useForm<VerifyBodyType>({
    resolver: zodResolver(VerifyBody),
    defaultValues: {
      _id: id,
      code: "",
    },
  });

  const onSubmit = async (values: VerifyBodyType) => {
    const { _id, code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: { _id, code },
    });

    if (res?.data) {
      toast.success("Verify successfully");
      router.push(`/signin`);
    } else {
      toast.error("Verify Error", {
        description:
          res?.message || "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <div className="rounded-2xl w-full max-w-md shadow-lg p-8 space-y-6 dark:bg-slate-700">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">
          Verify Your Account
        </h1>
        <p className="text-muted-foreground">
          We have sent a verification link to your email. Please check your
          inbox and click the link to verify your account.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="code">Code</FormLabel>
                  <FormControl>
                    <Input id="code" formNoValidate type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Verify;
