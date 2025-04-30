import { instance } from "@/config/AxiosInstance";
import { ICourse } from "@/utils/interface/getCourseById.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["couerse", id],
    queryFn: () =>
      instance.get<ICourse>(`/courses/${id}`).then((res) => res.data),
  });
};
