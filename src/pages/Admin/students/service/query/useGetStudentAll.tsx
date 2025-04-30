import { instance } from "@/config/AxiosInstance";
import { IGetStudentInterface } from "@/utils/interface/getStudent.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentAll = () => {
  return useQuery({
    queryKey: ["student:all"],
    queryFn: () =>
      instance
        .get<IGetStudentInterface>("/students/all")
        .then((res) => res.data),
  });
};
