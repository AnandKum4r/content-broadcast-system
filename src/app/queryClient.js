// src/app/queryClient.js

import { QueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

/*
  Global React Query configuration
*/

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,

      refetchOnWindowFocus: false,

      staleTime: 1000 * 60 * 5,
    },

    mutations: {
      onError: (error) => {
        toast.error(error.message || "Something went wrong");
      },
    },
  },
});
