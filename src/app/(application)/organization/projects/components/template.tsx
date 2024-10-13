"use client";

import { AlertModal } from "@/components/ui/alert-modal";
import { Typography } from "@/components/ui/typography";
import { MAX_ORGANIZATION_PROJECTS_COUNT } from "@/const/limits";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { ArrowRight, PlusCircle } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

const mockData = [
  {
    id: "1",
    name: "Introduction to JavaScript",
    slug: "introduction-to-javascript",
    logoUrl: "https://via.placeholder.com/1200x600",
    url: "example.comscript",
    description:
      "Learn the basics of JavaScript, the most popular programming language for web development.",
  },
  {
    id: "2",
    name: "Advanced CSS Techniques",
    slug: "advanced-css-techniques",
    logoUrl: "https://via.placeholder.com/1200x600",
    url: "example.comues",
    description:
      "Explore advanced CSS features and techniques to create visually stunning web pages.",
  },
  {
    id: "3",
    name: "Building REST APIs with Node.js",
    slug: "building-rest-apis-with-nodejs",
    logoUrl: "https://via.placeholder.com/1200x600",
    url: "example.comith-nodejs",
    description:
      "Master the art of building RESTful APIs using Node.js and Express framework.",
  },
  {
    id: "4",
    name: "Understanding TypeScript",
    slug: "understanding-typescript",
    logoUrl: "https://via.placeholder.com/1200x600",
    url: "example.comript",
  },
  {
    id: "5",
    name: "Next.js for Beginners",
    slug: "nextjs-for-beginners",
    logoUrl: "https://via.placeholder.com/1200x600",
    url: "example.com",
    description:
      "Learn the fundamentals of Next.js, a React framework for building fast and scalable web applications.",
  },
];

export const OrganizationProjectsTemplate = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const projects = mockData;

  return (
    <>
      <header className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex flex-col gap-1">
          <Typography level="h1" weight="medium" styling="h2">
            Your projects
          </Typography>
          <Typography styling="small">
            Here you can manage your projects
          </Typography>
        </div>
      </header>

      <section className="mt-8">
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} as="li" className="">
              <CardHeader className="flex gap-3">
                <Image
                  alt={project.name}
                  height={40}
                  src={project.logoUrl}
                  width={40}
                  className="aspect-square object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-md">{project.name}</p>
                  <p className="text-small text-default-500">{project.url}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {project.description ? (
                  <Typography styling="xs">{project.description}</Typography>
                ) : (
                  <Typography styling="xxs" className="opacity-50">
                    Description not provided{" "}
                  </Typography>
                )}
              </CardBody>
              <Divider />
              <CardFooter className="flex items-center justify-between">
                <Link as={NextLink} size="sm" href="#">
                  To project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}

          <li>
            <Card
              as="button"
              isBlurred
              isHoverable
              isPressable
              isDisabled={projects.length >= MAX_ORGANIZATION_PROJECTS_COUNT}
              className="border-none bg-background/60 dark:bg-default-100/50 w-full h-full"
              shadow="sm"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              <CardBody className="text-center flex-row gap-2 justify-center items-center">
                <PlusCircle className="w-5 h-5" />
                <Typography styling="large" weight="medium">
                  Create new Project
                </Typography>
              </CardBody>
            </Card>
          </li>
        </ul>
      </section>

      {/* TEMP modal */}
      <AlertModal
        isOpen={isNewProjectModalOpen}
        onConfirm={() => {}}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create new modal"
        description="Field needed fields to create new project"
        cancel="Cancel"
        confirm="Create new project"
      />
    </>
  );
};
