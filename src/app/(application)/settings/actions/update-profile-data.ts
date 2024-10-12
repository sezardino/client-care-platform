"use server";

import { ProjectUrls } from "@/const/url";
import { prisma } from "@/libs/prisma";
import { ProfileFormSchema } from "@/schemas/profile";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const uploadAvatarImage = async () => {};

export const updateProfileData = async (data: unknown) => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    ProfileFormSchema,
    data
  );

  if (!validationResponse.success) {
    return { message: "Validation error", errors: validationResponse.errors };
  }

  const { firstName, lastName, position } = validationResponse.data;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, position },
    });
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Update Profile." };
  }

  revalidatePath(ProjectUrls.userSettings);
};
