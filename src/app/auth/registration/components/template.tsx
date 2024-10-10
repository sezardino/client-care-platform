"use client";

import { RegistrationForm } from "@/components/form/registration";

import { Typography } from "@/components/ui/typography";

import { ProjectUrls } from "@/const/url";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Link,
} from "@nextui-org/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import NextLink from "next/link";
import { useRegistration } from "../use-registration";

const REGISTRATION_FORM_ID = "registration-form-id";

type Props = {
  inviteId?: string;
  inviteValidationError?: string;
};

export const RegistrationTemplate = (props: Props) => {
  const { inviteValidationError, inviteId } = props;

  const { errors, registration, isLoading } = useRegistration({
    inviteHasErrors: !!inviteValidationError,
    inviteId,
  });

  return (
    <Card className="md:w-96 py-5">
      <CardHeader className="gap-2 flex-col items-start">
        <Typography
          level="h1"
          styling="h3"
          className={cn(inviteValidationError && "sr-only")}
        >
          Create new account
        </Typography>

        {inviteValidationError && (
          <div className="flex flex-col gap-5 mt-5">
            <Typography level="h2" styling="h3" className="text-center">
              Something went wrong when try to validate inviting
            </Typography>
            <Typography
              level="p"
              styling="small"
              className="text-red-400 text-center"
            >
              {inviteValidationError}
            </Typography>
          </div>
        )}

        <Link
          as={NextLink}
          size="sm"
          href={ProjectUrls.home}
          className="-order-1 !justify-start gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </CardHeader>
      {!inviteValidationError && (
        <CardBody className="mt-2">
          <RegistrationForm
            id={REGISTRATION_FORM_ID}
            onFormSubmit={registration}
            errors={errors}
          />
        </CardBody>
      )}

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        {!inviteValidationError && (
          <Button
            form={REGISTRATION_FORM_ID}
            disabled={isLoading}
            color="primary"
            type="submit"
            size="sm"
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        )}

        <Typography level="p" styling="small" className="text-center">
          Already have an account?{" "}
          <Link as={NextLink} size="sm" href={ProjectUrls.login}>
            Login
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};
