import { ToastInner } from "@/components/ui/toast-inner";
import { useServerMutation } from "@/libs/react-query/helpers";
import { ImageFormValues } from "@/schemas/image";
import { toast } from "sonner";
import { setProfileAvatar } from "../actions/set-profile-avatar";
import { CURRENT_USER_QUERY_KEY } from "@/app/hooks/current-user";

export const useSetProfileAvatarMutation = () => {
  return useServerMutation({
    mutationFn: async (values: ImageFormValues) => {
      const { image } = values;

      const formData = new FormData();
      formData.set("image", image);

      return setProfileAvatar(formData);
    },
    getQueriesToInvalidate: () => [[CURRENT_USER_QUERY_KEY]],
    onSuccess: () =>
      toast.success(<ToastInner message="Avatar changed successfully" />),
    onError: (error) =>
      toast.error(<ToastInner message={error.message} errors={error.errors} />),
  });
};
