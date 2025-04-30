import { instance } from "@/config/AxiosInstance";
import { IGetGroupByIdInterface } from "@/utils/interface/getGroupById.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetGroupById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["group", id],
    queryFn: () =>
      instance
        .get<IGetGroupByIdInterface>(`/groups/${id}`)
        .then((res) => res.data),
  });
};
