import { instance } from "@/config/AxiosInstance";
import { IGetStudentByIdInterface } from "@/utils/interface/getStudentById.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () =>
      instance
        .get<IGetStudentByIdInterface>(`/students/${id}`)
        .then((res) => res.data),
  });
};
