"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RenewPasswordBody,
  RenewPasswordBodyType,
  SendCodeBody,
  SendCodeBodyType,
} from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { sendRequest } from "@/lib/api/api";
import { toast } from "sonner";

export interface ModalRenewPasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalRenewPassword = ({
  open,
  onOpenChange,
}: ModalRenewPasswordProps) => {
  const [tabValue, setTabValue] = useState("sendCode");
  const formSendCode = useForm<SendCodeBodyType>({
    resolver: zodResolver(SendCodeBody),
    defaultValues: {
      email: "",
    },
  });
  const formRenewPassword = useForm<RenewPasswordBodyType>({
    resolver: zodResolver(RenewPasswordBody),
    defaultValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSendCode = async (values: SendCodeBodyType) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/retry-password`,
      method: "POST",
      body: { email },
    });

    if (res?.data) {
      formRenewPassword.setValue("email", email);
      setTabValue("renewPassword");
    } else {
      toast.error("Send code failed", {
        description:
          res?.message || "Something went wrong, please try again later.",
      });
    }
  };
  const onRenewPassword = async (values: RenewPasswordBodyType) => {
    const { email, code, confirmPassword, password } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/change-password`,
      method: "POST",
      body: { email, code, confirmPassword, password },
    });

    if (res?.data) {
      toast.success("Password changed successfully! Please login again.");
      onOpenChange(false);
    } else {
      toast.error("Renew password failed", {
        description:
          res?.message || "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Forgot Your Password?</DialogTitle>
        <DialogDescription>
          Do not worry! We will send a verification code to your email so you
          can create a new password.
        </DialogDescription>
        <Tabs value={tabValue} className="w-full">
          <TabsList>
            <TabsTrigger value="sendCode">Send Code</TabsTrigger>
            <TabsTrigger value="renewPassword">Renew Password</TabsTrigger>
          </TabsList>
          <TabsContent value="sendCode">
            <Form {...formSendCode}>
              <form
                className="space-y-4"
                onSubmit={formSendCode.handleSubmit(onSendCode)}
              >
                <div className="space-y-2">
                  <FormField
                    control={formSendCode.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            formNoValidate
                            type="email"
                            placeholder="Example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send code
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="renewPassword">
            <Form {...formRenewPassword}>
              <form
                className="space-y-4"
                onSubmit={formRenewPassword.handleSubmit(onRenewPassword)}
              >
                <div className="space-y-2">
                  <FormField
                    control={formRenewPassword.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="code">Code</FormLabel>
                        <FormControl>
                          <Input
                            id="code"
                            formNoValidate
                            type="text"
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
                    control={formRenewPassword.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            formNoValidate
                            type="password"
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
                    control={formRenewPassword.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="confirmPassword">
                          Confirm new password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            formNoValidate
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Renew Password
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ModalRenewPassword;
