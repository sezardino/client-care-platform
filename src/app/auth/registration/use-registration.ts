import { USER_INVITE_SEARCH_PARAMETER } from "@/const/search-params";
import { ProjectUrls } from "@/const/url";
import { RegistrationDto } from "@/dto/auth";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "next/navigation";

import { useState } from "react";

type Args = {
  inviteId?: string;
  inviteHasErrors: boolean;
};

export const useRegistration = (args: Args) => {
  const { inviteHasErrors, inviteId } = args;

  const { isLoaded, signUp } = useSignUp();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle submission of the sign-up form
  const registration = async (values: RegistrationDto) => {
    if (!isLoaded) return;

    if (inviteId && inviteHasErrors)
      return setErrors([{ message: "Invalid invite", code: "123" }]);

    const { email, password } = values;

    // Start the sign-up process using the email and password provided
    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      const redirectUrl = inviteId
        ? `${ProjectUrls.registrationVerification}?${USER_INVITE_SEARCH_PARAMETER}=${inviteId}`
        : ProjectUrls.registrationVerification;

      router.push(redirectUrl);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return { errors, registration, isLoading };
};
