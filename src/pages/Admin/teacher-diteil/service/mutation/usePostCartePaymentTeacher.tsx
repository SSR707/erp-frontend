import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePostCartePaymentTeacher = () => {
  return useMutation({
    mutationFn: (data: any) =>
      instance.post("/payment-teacher", data).then((res) => res.data),
  });
};
