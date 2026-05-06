import { useQuery } from "@tanstack/react-query";
import { getTeacherStats } from "../services/teacher.service";

/*
  Custom hook for teacher stats
*/
export const useTeacherStats = () => {
  return useQuery({
    queryKey: ["teacher-stats"],
    queryFn: getTeacherStats,
  });
};
