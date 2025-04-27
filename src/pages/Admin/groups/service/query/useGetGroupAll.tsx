import { instance } from "@/config/AxiosInstance";
import { IGetGroupInterface } from "@/utils/interface/getGroup.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetGroupAll = () => {
  return useQuery({
    queryKey: ["groups_all"],
    queryFn: () =>
      instance.get<IGetGroupInterface>(`/groups`).then((res) => res.data),
  });
};
