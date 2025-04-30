import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePostCartePaymentStudent = () => {
  return useMutation({
    mutationFn: (data: any) =>
      instance.post("/payment-student", data).then((res) => res.data),
  });
};
