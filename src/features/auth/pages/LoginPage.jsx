// src/features/auth/pages/LoginPage.jsx
import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen w-full bg-white overflow-hidden">
      {/* Left Side: Cinematic Branding */}
      <div className="hidden w-1/2 bg-slate-950 lg:flex items-center justify-center p-16 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px] opacity-10"></div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-6">
            Welcome <span className="text-indigo-400">Back.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Manage your classroom, track student progress, and stay connected
            with your institution in one seamless experience.
          </p>
        </div>
      </div>

      {/* Right Side: Elegant Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 bg-slate-50/50">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Sign In
            </h2>
            <p className="mt-3 text-slate-500">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <div className="bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/60 lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="p-6 lg:p-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
