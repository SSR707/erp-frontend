import { instance } from "@/config/AxiosInstance";
import { IGetGroupInterface } from "@/utils/interface/getGroup.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGroup = (page: number, limit: number ) => {
  return useQuery({
    queryKey: ["groups", page, limit],
    queryFn: () =>
      instance
        .get<IGetGroupInterface>(`groups?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });
};
