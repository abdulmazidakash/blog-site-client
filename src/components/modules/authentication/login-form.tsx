"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Field,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod';
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  password: z.string().min(8, "Minimum 8 characters required"),
  email: z.string(),
})

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });

    console.log('google login ===>', data)
  }

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // console.log(" Submitting form with values: ", values);
      const toastId = toast.loading("logging into your account...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
        }

      } catch (error) {
        console.log("Error during login: ", error);
        toast.error("Failed to login", { id: toastId });
      }
    }
  });


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field >
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field >
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="login-form" type="submit" className="w-full">Submit</Button>
        <Button onClick={() => handleGoogleLogin()} variant="outline" type="button">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
