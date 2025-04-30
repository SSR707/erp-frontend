import { instance } from "@/config/AxiosInstance";
import { IGetTeacherByIdInterface } from "@/utils/interface/getTeacherById.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () =>
      instance
        .get<IGetTeacherByIdInterface>(`/teacher/${id}`)
        .then((res) => res.data),
  });
};
