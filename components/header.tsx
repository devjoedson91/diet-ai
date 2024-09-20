"use client";

import { ChevronLeft, Loader } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  step?: string;
}

export default function Header({ title, step }: HeaderProps) {
  const router = useRouter();

  function handleNavigation() {
    router.back();
  }

  return (
    <Card className="rounded-t-none rounded-b-2xl">
      <CardContent className="w-full h-[140px] flex flex-col justify-center text-black">
        <div className="flex items-center gap-4">
          {step && (
            <Button
              size="icon"
              variant="outline"
              onClick={handleNavigation}
              className="border-none"
            >
              <ChevronLeft size={27} />
            </Button>
          )}

          <h3 className="text-base font-normal">{step}</h3>
          {step && <Loader size={27} />}
        </div>
        <h1 className="text-2xl font-bold text-background ml-3">{title}</h1>
      </CardContent>
    </Card>
  );
}
