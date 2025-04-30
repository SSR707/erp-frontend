import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useDeleteGroupById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) =>
      instance.delete(`/groups/${id}`).then((res) => res.data),
  });
};
