"use client";

import { ProfileFormSchema, ProfileFormValues } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn, Input } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";

type ProfileFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: ProfileFormValues) => void;
  initialValues: Partial<ProfileFormValues>;
};

export const ProfileForm = (props: ProfileFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: ProfileFormValues) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("grid grid-cols-1 gap-4 md:gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="First Name"
                placeholder="John"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="Last Name"
                placeholder="Doe"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="Position"
                placeholder="CEO in Next-blog"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          color="primary"
          isDisabled={!form.formState.isDirty}
          className="ml-auto"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};
