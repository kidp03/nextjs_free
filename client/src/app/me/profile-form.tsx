"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema";
import { toast } from "sonner";

import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import {
    AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import accountApiRequest from "@/apiRequest/account";

type Profile = AccountResType['data']
const ProfileForm = ({
    profile
} : {
    profile:Profile
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await accountApiRequest.updateMe(values);

      toast.success("", {
        description: result.payload.message,
      });
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[400px]"
        noValidate
      >
        <FormControl>
          <Input placeholder="shadcn" type="email" value= {profile.email} readOnly />
        </FormControl>

        <FormMessage />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="Tên" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  );
};
export default ProfileForm;
