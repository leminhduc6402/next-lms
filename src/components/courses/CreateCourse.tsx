"use client";
import { Button } from "@/components/ui/button";
import { handleCreateCourseAction } from "@/lib/api/courses";
import { uploadThumbnailAPI } from "@/lib/api/upload";
import {
  CreateCourseBody,
  CreateCourseBodyType,
} from "@/lib/validation/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { FixedFormMessage } from "../FixedFormMessage";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
export interface ModalCreateCourseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateCourse() {
  const router = useRouter();
  const form = useForm<CreateCourseBodyType>({
    resolver: zodResolver(CreateCourseBody),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      price: 0,
      category: "",
      status: "Private",
    },
  });

  const uploadThumbnail = async (
    file: File,
    form: UseFormReturn<any>
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = await uploadThumbnailAPI(formData);
      form.setValue("thumbnail", url, { shouldValidate: true });
      toast.success("Uploaded successfully!");
    } catch (err) {
      console.error("Upload thumbnail failed", err);
      toast.error("Upload failed");
    }
  };
  const onSubmit = async (data: CreateCourseBodyType) => {
    // console.log(">>> check: ", data);
    try {
      const res = await handleCreateCourseAction(data);
      if (res?.data && res.statusCode === 201) {
        toast.success("Create course successfully");
        router.push(`/dashboard/courses/${res.data._id}`);
      } else {
        console.log(res)
        toast.error("Failed to create course");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create course");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FixedFormMessage name="title" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-7">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              {/* <FixedFormMessage name="description" /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadThumbnail(file, form);
                  }}
                />
              </FormControl>
              <FixedFormMessage name="thumbnail" />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input {...field} type="file" />
              </FormControl>
              <FixedFormMessage name="thumbnail" />
            </FormItem>
          )}
        /> */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1/3">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FixedFormMessage name="price" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1/3">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FixedFormMessage name="category" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1/3">
                <FormLabel>Status</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Publish">Publish</SelectItem>
                  </SelectContent>
                </Select>
                <FixedFormMessage name="status" />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          // className="w-full"
          // disabled={form.formState.isSubmitting}
        >
          Create course
        </Button>
        {/* {form.formState.isSubmitting ? "Creating..." : "Create course"} */}
      </form>
    </Form>
  );
}
