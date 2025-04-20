import { instance } from "@/config/AxiosInstance";
import { IGetProfile } from "@/utils/interface/getProfile.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetAmdinProfile = () => {
  return useQuery({
    queryKey: ["admin_profile"],
    queryFn: () => instance.get<IGetProfile>("admin/getProfile").then((res) => res.data),
  });
};
