"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      email: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error) {
    switch ((error as any).name + "") {
      case "InvalidEmailPasswordError":
        return {
          error: "Invalid email or password",
          code: 1,
        };
      case "AccountNotVerifiedError":
        return {
          error: "Account is not verified yet",
          code: 2,
        };

      default:
        return {
          error: "Account not found",
          code: 3,
        };
    }
  }
}
