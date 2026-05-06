// src/features/principal/hooks/usePrincipalStats.js

import { useQuery } from "@tanstack/react-query";

import { getPrincipalStats } from "../services/approval.service";

/*
  Custom hook for principal dashboard stats
*/
export const usePrincipalStats = () => {
  return useQuery({
    queryKey: ["principal-stats"],
    queryFn: getPrincipalStats,
  });
};