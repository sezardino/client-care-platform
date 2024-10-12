"use client";

import { useCurrentUserQuery } from "@/app/hooks/current-user";
import { ImageForm } from "@/components/form/image";
import { ProfileForm } from "@/components/form/profile";
import { AlertModal } from "@/components/ui/alert-modal";
import { Typography } from "@/components/ui/typography";
import { useCallback, useState } from "react";
import { useDeleteProfileAvatarMutation } from "../hooks/delete-profile-avatar";
import { useSetProfileAvatarMutation } from "../hooks/set-profile-avatar";

export const UserProfileSettingsTemplate = () => {
  const [isDeleteInitialAvatarModalOpen, setIsDeleteInitialAvatarModalOpen] =
    useState(false);

  const { data: currentUserData } = useCurrentUserQuery();
  const { mutateAsync: setProfileAvatar } = useSetProfileAvatarMutation();
  const { mutateAsync: deleteProfileAvatar } = useDeleteProfileAvatarMutation();

  const deleteCurrentImageHandler = useCallback(async () => {
    try {
      await deleteProfileAvatar(undefined);

      setIsDeleteInitialAvatarModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, [deleteProfileAvatar]);

  if (!currentUserData) return null;

  return (
    <>
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <Typography level="h2" styling="h3" weight="medium">
            User Profile
          </Typography>

          <div className="grid max-w-2xl gap-5 mx-auto mt-4">
            <ImageForm
              key={currentUserData.avatarUrl || ""}
              initialImageUrl={currentUserData?.avatarUrl || undefined}
              onTryToDeleteImage={() => setIsDeleteInitialAvatarModalOpen(true)}
              onFormSubmit={setProfileAvatar}
            />
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={isDeleteInitialAvatarModalOpen}
        title="Are you sure?"
        description="This operation can be restored"
        cancel="Cancel"
        confirm="Delete avatar"
        onClose={() => setIsDeleteInitialAvatarModalOpen(false)}
        onConfirm={deleteCurrentImageHandler}
      />
    </>
  );
};
