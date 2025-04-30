import { instance } from "@/config/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

interface IPostGroupMember {
  groupId: string | undefined;
  userId: string;
}
export const usePostGroupMemberCreate = () => {
  return useMutation({
    mutationFn: (data: IPostGroupMember) =>
      instance.post("/group-members", data).then((res) => res.data),
  });
};
