// src/app/providers.jsx
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./queryClient";

import { AuthProvider } from "@/features/auth/context/AuthContext";

import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}

        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;