import { instance } from "@/config/AxiosInstance";
import { IGetStudentInterface } from "@/utils/interface/getStudent.interface";
import { useQuery } from "@tanstack/react-query";

const useGetAllStudent = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: () =>
      instance
        .get<IGetStudentInterface>("/students?page=1&limit=46")
        .then((res) => res.data),
  });
};

export default useGetAllStudent;
