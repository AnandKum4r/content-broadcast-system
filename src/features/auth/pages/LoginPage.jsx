// src/features/auth/pages/LoginPage.jsx
import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen w-full">
      {/* Left Side: Decorative Branding (Visible on MD screens up) */}
      <div className="hidden w-1/2 bg-slate-900 lg:flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, gray 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-md text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-lg">
            Manage your classroom, track student progress, and stay connected
            with your institution in one seamless experience.
          </p>
        </div>

        {/* Abstract Glow shapes */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2 lg:bg-slate-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Sign In
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your credentials to access your dashboard
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
