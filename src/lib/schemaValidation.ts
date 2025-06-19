import z from "zod";

export const SignInBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();
export type SignInBodyType = z.TypeOf<typeof SignInBody>;

export const SignUpBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    // confirmPassword: z.string().min(6).max(100),
  })
  .strict();
// .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Mật khẩu không khớp",
//       path: ["confirmPassword"],
//     });
//   }
// });

export type SignUpBodyType = z.TypeOf<typeof SignUpBody>;

export const VerifyBody = z
  .object({
    _id: z.string(),
    code: z.string().trim().nonempty("Please enter the verification code"),
  })
  .strict();

export type VerifyBodyType = z.TypeOf<typeof VerifyBody>;
