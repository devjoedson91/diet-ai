import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./ui/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ScreenButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className="bg-blue w-full h-11 border-none text-base font-bold hover:bg-blue/40"
      {...props}
    >
      {children}
    </Button>
  );
}
