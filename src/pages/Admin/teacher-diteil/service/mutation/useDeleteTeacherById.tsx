import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTeacherById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) =>
      instance.delete(`/teacher/${id}`).then((res) => res.data),
  });
};
