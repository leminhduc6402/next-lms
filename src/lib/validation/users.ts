import z from "zod";

export const EditUserBody = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
  isActive: z.boolean(),
  accountType: z.enum(["LOCAL", "GOOGLE", "GITHUB"]),
});
export type EditUserBodyType = z.TypeOf<typeof EditUserBody>;

export const CreateUserBody = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(["USER", "ADMIN"]),
  isActive: z.boolean(),
  accountType: z.enum(["LOCAL", "GOOGLE", "GITHUB"]),
});
export type CreateUserBodyType = z.TypeOf<typeof CreateUserBody>;
