"use client";

import Header from "@/components/header";
import { useDataStore } from "@/store/data";

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  console.log(user);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Minha dieta" />
    </div>
  );
}
