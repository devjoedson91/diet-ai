"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

interface StepDataProps {
  name: string;
  age: string;
  heigth: string;
  weigth: string;
}

export default function Create() {
  const searchParams = useSearchParams();

  const search = searchParams.get("step-data");

  const [stepData, setStepData] = useState<StepDataProps>({} as StepDataProps);

  useEffect(() => {
    setStepData(JSON.parse(search || "{}"));
  }, [search]);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Finalizando dieta" step="Passo 2" />
      <div className="flex flex-1"></div>
    </div>
  );
}
