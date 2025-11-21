"use client";
import { ListFilter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "./ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FiltrationOptions = [
  "Canadian",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "Filipino"
] as const;

import * as z from "zod";

const formSchema = z.object({
  filterOption: z.enum(FiltrationOptions, {
    message: "Please select a filtration option."
  })
});

type filtrationValue = z.infer<typeof formSchema>;
export function Filtration() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // console.log(searchParams);

  const search = searchParams.get("a") || "Canadian";
  const existOption = FiltrationOptions.includes(
    search as (typeof FiltrationOptions)[number]
  );

  const form = useForm<filtrationValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filterOption: existOption
        ? (search as (typeof FiltrationOptions)[number])
        : "Canadian"
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(data: filtrationValue) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("s")) {
      params.delete("s");
    }
    params.set("a", data.filterOption);

    router.push(`/?${params.toString()}`);

    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-14 h-14 rounded-full flex items-center justify-center bg-(--base1) border border-(--shade20) cursor-pointer"
          >
            {" "}
            <ListFilter className="w-6 h-6 text-(--base0)" />
          </Button>
        </DialogTrigger>

        <DialogContent className="p-8 w-[440px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-extrabold leading-7 text-(--base0) mb-4">
              Filter
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1"
          >
            <Controller
              name="filterOption"
              control={form.control}
              render={({ field }) => <RadioGroupFiltration field={field} />}
            />

            <DialogFooter className="flex justify-between sm:justify-between items-center pt-[30px]">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className=" leading-4 tracking-[1.25px] text-[14px]  font-medium uppercase"
                >
                  Clear
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="uppercase tracking-[1.25px] leading-4 font-medium text-(--base1)"
              >
                Show Recipes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}

interface RadioGroupFiltrationProps {
  field: ControllerRenderProps<filtrationValue, "filterOption">;
}
export function RadioGroupFiltration({ field }: RadioGroupFiltrationProps) {
  return (
    <RadioGroup
      defaultValue={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    >
      {FiltrationOptions.map((filter) => {
        return (
          <div
            className=" h-12 flex justify-between items-center border-b border-b-[#21212114] "
            key={filter}
          >
            <Label
              className="font-normal text-[16px] leading-6"
              htmlFor={filter}
            >
              {filter}
            </Label>

            <RadioGroupItem value={filter} id={filter} />
          </div>
        );
      })}
    </RadioGroup>
  );
}
