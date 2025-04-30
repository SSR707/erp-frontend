import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePatchReacher = () => {
  return useMutation({
    mutationFn: (data: any) => {
      const { id, ...rest } = data;
      return instance.patch(`/teacher/${id}`, rest).then((res) => res.data);
    },
  });
};
