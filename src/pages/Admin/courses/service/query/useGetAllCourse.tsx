import { instance } from "@/config/AxiosInstance";
import { IGetCourseInterface } from "@/utils/interface/getCourser.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetCourse = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["course", page, limit],
    queryFn: () =>
      instance
        .get<IGetCourseInterface>(`/courses?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });
};
