import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCourseById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) => instance.delete(`/courses/${id}`),
  });
};
