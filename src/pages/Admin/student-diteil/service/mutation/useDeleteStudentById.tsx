import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useDeleteStudentById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) => instance.delete(`/students/${id}`),
  });
};
