"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import ScreenButton from "@/components/screen-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleDietGeneration() {
    router.push("/step");
  }

  return (
    <div className="flex h-screen gap-5 flex-col items-center justify-center px-4">
      <div className="relative size-52">
        <Image src={Logo} alt="Logo" fill />
      </div>
      <h1 className="text-4xl font-bold text-green">
        Dieta<span className="text-white">.AI</span>
      </h1>
      <p className="text-base text-center w-60">
        Sua dieta personalizada com inteligência artificial
      </p>
      <ScreenButton onClick={handleDietGeneration}>Gerar dieta</ScreenButton>
    </div>
  );
}
