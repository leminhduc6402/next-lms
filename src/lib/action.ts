"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    return r;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Incorrect username or password" };
  }
}
