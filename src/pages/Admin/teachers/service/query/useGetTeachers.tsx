import { instance } from "@/config/AxiosInstance";
import { IGetTeachersInterface } from "@/utils/interface/getTeachers.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      instance
        .get<IGetTeachersInterface>(`/teacher?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });
};
