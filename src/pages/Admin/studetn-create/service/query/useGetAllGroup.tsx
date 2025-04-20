import { instance } from "@/config/AxiosInstance";
import { IGetGroupInterface } from "@/utils/interface/getGroup.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGroup = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      instance.get<IGetGroupInterface>("groups?page=1&limit=1000").then((res) => res.data),
  });
};
