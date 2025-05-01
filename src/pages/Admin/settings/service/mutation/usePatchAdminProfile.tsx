import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePatchAdminProfile = () => {
  return useMutation({
    mutationFn: (data: any) => {
      const { id, ...rest } = data;
      return instance.patch(`/admin/${id}`, rest).then((res) => res.data);
    },
  });
};
