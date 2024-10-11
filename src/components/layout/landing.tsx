import { CurrentUserData } from "@/types/user";
import { PropsWithChildren } from "react";
import { LandingFooter } from "../modules/layout/landing-footer";
import { LandingHeader } from "../modules/layout/landing-header";

type Props = PropsWithChildren & {
  user: CurrentUserData | null;
};

export const LandingLayout = (props: Props) => {
  const { user, children } = props;

  return (
    <>
      <LandingHeader user={user} />
      {children}
      <LandingFooter isUserAuthenticated={!!user} />
    </>
  );
};
