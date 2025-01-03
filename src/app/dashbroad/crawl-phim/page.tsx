"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crawlPhimAction } from "@/app/actions/crawl-action";

const formSchema = z.object({
  currentPage: z.coerce
    .number({
      invalid_type_error: "Page phải là số lớn hơn 0",
    })
    .min(1, {
      message: "Page không được nhỏ hơn 1",
    }),
  totalPage: z.coerce
    .number({ invalid_type_error: "Page phải là số lớn hơn 0" })
    .min(0, {
      message: "Tổng page không được nhỏ hơn 0",
    }),
  source: z.string(),
});

export type TypeForm = z.infer<typeof formSchema>;

export default function CrawlPhimPage() {
  const form = useForm<TypeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPage: 1,
      totalPage: -1,
    },
  });
  const handleSubmit = useCallback(async (data: TypeForm) => {
    await crawlPhimAction(data);
  }, []);

  return (
    <div className="m-6 p-6 rounded-xl border border--sidebar-accent text--primary-text">
      <div className="font- text-center pb-6">Crawl Phim</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="currentPage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Page</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalPage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Page</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nguồn crawl</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn nguồn crawl" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ophim">Ổ Phim</SelectItem>
                          <SelectItem value="kkphim">KK Phim</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Bắt đầu</Button>
            </form>
          </Form>
        </div>
        <div className="md:col-span-1">item 2</div>
      </div>
    </div>
  );
}
