import { instance } from "@/config/AxiosInstance";
import { IGetGroupInterface } from "@/utils/interface/getGroup.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGroup = (
  page: number,
  limit: number,
  status: string | undefined,
  start_date: string | undefined,
  name: string | undefined
) => {
  return useQuery({
    queryKey: ["groups", page, limit, status, start_date, name],
    queryFn: () =>
      instance
        .get<IGetGroupInterface>(`groups?page=${page}&limit=${limit}`, {
          params: { status, start_date, name },
        })
        .then((res) => res.data),
  });
};
