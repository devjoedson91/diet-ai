"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";

interface OptionsProps {
  label: string;
  value: string | number;
}

interface ControlSelectProps {
  control: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  name: string;
  options: OptionsProps[];
}

export default function ControlSelect({
  control,
  name,
  label,
  options,
}: ControlSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel className="font-bold text-base">{label}:</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full h-11 justify-between text-black"
                >
                  {value
                    ? options.find((option) => option.value === value)?.label
                    : "Selecione..."}
                  <ChevronDown size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value as string}
                          onSelect={(currentValue) => {
                            onChange(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
