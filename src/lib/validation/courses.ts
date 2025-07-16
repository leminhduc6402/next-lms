import z from "zod";

export const lessonSchema = z.object({
  title: z.string(),
  status: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
  order: z.number(),
});

export const CreateSectionBody = z.object({
  name: z.string(),
  order: z.number(),
  lessonId: z.array(lessonSchema),
});

export const teacherSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().url(),
});

export const CreateCourseBody = z.object({
  // _id: z.string(),
  title: z.string().nonempty(),
  description: z.string(),
  thumbnail: z.string().nonempty(),
  price: z.number().nonnegative(),
  category: z.string().nonempty(),
  status: z.string().nonempty(),
});
export type CreateCourseBodyType = z.TypeOf<typeof CreateCourseBody>;
