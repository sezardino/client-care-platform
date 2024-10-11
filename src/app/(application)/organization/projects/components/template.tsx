"use client";

import { Button } from "@nextui-org/react";
import { useOrganizationProjectsQuery } from "../hooks/projects";

export const OrganizationProjectsTemplate = () => {
  const { data, refetch } = useOrganizationProjectsQuery();

  return (
    <h1>
      {JSON.stringify(data)}

      <Button onClick={() => refetch()}>refetch</Button>
    </h1>
  );
};
