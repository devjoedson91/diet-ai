import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface ControlInputProps {
  control: any;
  label: string;
  name: string;
  placeholder: string;
  maxLength?: number;
}

export default function ControlInput({
  control,
  label,
  name,
  placeholder,
  maxLength,
}: ControlInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold text-base">{label}:</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} maxLength={maxLength} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
