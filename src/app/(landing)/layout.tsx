import { LandingLayout } from "@/components/layout/landing";
import { PropsWithChildren } from "react";
import { getCurrentUserData } from "../actions/current-user";

const Layout = async ({ children }: PropsWithChildren) => {
  const userResponse = await getCurrentUserData();
  const user = "message" in userResponse ? null : userResponse;

  return <LandingLayout user={user}>{children}</LandingLayout>;
};

export default Layout;
