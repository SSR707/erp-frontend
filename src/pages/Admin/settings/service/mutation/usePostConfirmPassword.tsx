import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

interface IProp {
  new_password: string;
  old_password: string;
}
export const usePostConfirmPassword = () => {
  return useMutation({
    mutationFn: (data: IProp) =>
      instance.post("/auth/confirmPassword", data).then((res) => res.data),
  });
};
