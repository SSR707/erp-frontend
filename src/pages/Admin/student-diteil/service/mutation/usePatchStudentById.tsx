import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
interface IEditStudentParams {
  id: string | undefined;
  img_url?: string;
  full_name?: string;
  username?: string;
  password?: string;
  gender?: string;
  address?: string;
  groupId?: string;
  phone_number?: string;
  data_of_birth?: string;
}

export const usePatchStudentById = () => {
  return useMutation({
    mutationFn: (data: IEditStudentParams) => {
      const { id, ...rest } = data;
      return instance.patch(`/students/${id}`, rest).then((res) => res.data);
    },
  });
};
