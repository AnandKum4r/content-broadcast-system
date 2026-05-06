// src/components/forms/LoginForm.jsx
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { loginSchema } from "@/features/auth/utils/loginSchema";

import { loginUser } from "@/features/auth/services/auth.service";

import { setAuthData } from "@/features/auth/utils/authStorage";

import { useAuth } from "@/features/auth/hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  /*
    React Hook Form setup
  */

  const form = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  /*
    Login mutation
  */

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      /*
        Persist auth data
      */

      setAuthData(data);

      /*
        Store user in context
      */

      setUser(data.user);

      /*
        Success toast
      */

      toast.success("Login successful");

      /*
        Redirect based on role
      */

      if (data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/principal/dashboard");
      }
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  /*
    Submit handler
  */

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Demo Credentials */}

        <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm">
          <p className="font-semibold">Demo Credentials</p>

          <div className="mt-2 space-y-1">
            <p>Teacher: teacher@test.com / 123456</p>

            <p>Principal: principal@test.com / 123456</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;