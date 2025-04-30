import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePatchCourseById = () => {
  return useMutation({
    mutationFn: (data: any) => {
      const { id, ...rest } = data;
      return instance.patch(`/courses/${id}`, rest).then((res) => res.data);
    },
  });
};
