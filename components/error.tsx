import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

interface ErrorProps {
  message: string;
  error?: string;
}

export default function Error({ message, error }: ErrorProps) {
  return (
    <div
      className="flex h-screen gap-10 flex-col px-10 items-center justify-center"
      role="error"
    >
      <div className="relative size-52">
        <Image src={Logo} alt="Logo" fill />
      </div>
      <h1 className="text-center">
        <strong>{message}</strong>: {error || ""}
      </h1>
      <Link href="/step" className="font-semibold underline text-base">
        Tentar novamente
      </Link>
    </div>
  );
}
