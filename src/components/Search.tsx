"use client";

import { Search, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError } from "./ui/field";
import { useTransition } from "react";

const formSchema = z.object({
  search: z.string().trim().optional()
});

type SearchFormInputs = z.infer<typeof formSchema>;

export default function SearchRecipes() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SearchFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get("s")?.toString() || ""
    }
  });

  function onSubmit(formData: SearchFormInputs) {
    const term = formData.search?.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("s", term);
    } else {
      params.delete("s");
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
    form.reset({ search: "" });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
      <button
        type="submit"
        disabled={isPending}
        className="absolute top-4 left-4 text-(--shade40) hover:text-black transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Search className="w-6 h-6" />
        )}
      </button>

      <Controller
        name="search"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              disabled={isPending}
              placeholder="Search"
              className="w-[276px] h-14 rounded-full border border-(--shade20) 
               pl-14 placeholder:text-(--shade40) placeholder:font-semibold placeholder:text-[16px] line-height-6 outline-none disabled:bg-gray-100"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
