"use client";
import { SignInBody, SignInBodyType } from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { authenticate } from "@/lib/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInBodyType>({
    resolver: zodResolver(SignInBody),
    defaultValues: {
      email: "leminhduc6402@gmail.com",
      password: "Admin@123",
    },
  });
  async function onSubmit(values: SignInBodyType) {
    const { email, password } = values;
    // await signIn("credentials", values);
    const res = await authenticate(email, password);
    if (res?.error) {
      toast.error(res.error);
      if (res.code === 2) {
        router.push("/verify");
      }
    } else {
      toast.success("Sign in successfully");
      router.push("/dashboard");
    }
  }
  return (
    <div className="rounded-2xl w-full max-w-md shadow-lg p-8 space-y-6 dark:bg-slate-700">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Welcome</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      id="email"
                      placeholder="Example@gmail.com"
                      formNoValidate
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        autoComplete="new-password"
                        id="password"
                        placeholder="*********"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" name="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link
              href={"#"}
              className="text-sm font-medium text-blue-500 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center ">
          <span className="px-2 bg-white text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button type="button" variant="outline" className="w-full">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <title>Facebook</title>
            <path
              fill="#0866FF"
              d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
            />
          </svg>
          Facebook
        </Button>
        <Button type="button" variant="outline" className="w-full">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <title>Google</title>
            <path
              fill="#4285F4"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
          </svg>
          Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link
          href={"/signup"}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
