// src/components/forms/LoginForm.jsx
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { useState } from "react"; // Add this
import { Eye, EyeOff } from "lucide-react"; // Add this

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthData(data);
      setUser(data.user);
      toast.success("Welcome back!", {
        description: `Logged in as ${data.user.role}`,
      });

      if (data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/principal/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Invalid credentials");
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@institution.com"
                    className="h-11 border-slate-200 focus:ring-2 focus:ring-indigo-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-slate-700 font-semibold">
                    Password
                  </FormLabel>
                  <a
                    href="#"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <FormControl>
                  {/* 2. Wrap Input in a relative div and toggle type */}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 border-slate-200 focus:ring-2 focus:ring-indigo-500 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      {/* Separator */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500 lg:bg-slate-50">
            Demo Access
          </span>
        </div>
      </div>

      {/* Demo Credentials Box */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            form.setValue("email", "teacher@test.com");
            form.setValue("password", "123456");
          }}
          className="flex flex-col cursor-pointer items-start rounded-lg border border-slate-200 p-3 text-left transition-hover hover:bg-slate-100 group"
        >
          <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600">
            TEACHER
          </span>
          <span className="text-xs text-slate-600">teacher@test.com</span>
        </button>

        <button
          onClick={() => {
            form.setValue("email", "principal@test.com");
            form.setValue("password", "123456");
          }}
          className="flex flex-col cursor-pointer items-start rounded-lg border border-slate-200 p-3 text-left transition-hover hover:bg-slate-100 group"
        >
          <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600">
            PRINCIPAL
          </span>
          <span className="text-xs text-slate-600">principal@test.com</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
