"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendRequest } from "@/lib/api";
import { VerifyBody, VerifyBodyType } from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface ModalReactiveProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  email: string;
}

export function ModalReactive(props: ModalReactiveProps) {
  const router = useRouter();
  const { open, onOpenChange, email } = props;
  const form = useForm<VerifyBodyType>({
    resolver: zodResolver(VerifyBody),
    defaultValues: {
      _id: "",
      code: "",
    },
  });

  useEffect(() => {
    const retryActivation = async () => {
      if (!email) return;
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/retry-active`,
        method: "POST",
        body: { email },
      });
      if (res?.data) {
        form.setValue("_id", res.data._id);
      } else {
        toast.error("Retry activation failed", {
          description:
            res?.message || "Something went wrong, please try again later.",
        });
      }
    };
    retryActivation();
  }, [email, form]);

  const onSubmit = async (values: VerifyBodyType) => {
    const { _id, code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: { _id, code },
    });

    if (res?.data) {
      toast.success("Verify successfully");
      onOpenChange(false);
      router.push(`/signin`);
    } else {
      toast.error("Verify Error", {
        description:
          res?.message || "Something went wrong, please try again later.",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-modal="false">
        <DialogHeader>
          <DialogTitle>Verify Your Account</DialogTitle>
          <DialogDescription>
            We have sent a verification code to your email. Please enter the
            code below to complete the verification.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
