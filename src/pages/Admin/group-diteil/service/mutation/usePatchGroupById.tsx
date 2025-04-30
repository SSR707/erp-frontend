import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePatchGroupById = () => {
  return useMutation({
    mutationFn: (data: any) => {
      const { id, ...rest } = data;
      return instance.put(`/groups/${id}`, rest).then((res) => res.data);
    },
  });
};
