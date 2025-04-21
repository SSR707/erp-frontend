import { instance } from "@/config/AxiosInstance";
import { IGetTeachersInterface } from "@/utils/interface/getTeachers.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      instance
        .get<IGetTeachersInterface>("/teacher?page=1&limit=20")
        .then((res) => res.data),
  });
};
