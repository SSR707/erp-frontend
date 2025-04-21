import { instance } from "@/config/AxiosInstance";
import { IGetStudentInterface } from "@/utils/interface/getStudent.interface";
import { useQuery } from "@tanstack/react-query";

const useGetAllStudent = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["students", page, limit],
    queryFn: () =>
      instance
        .get<IGetStudentInterface>(`/students?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });
};

export default useGetAllStudent;
