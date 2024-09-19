"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import ScreenButton from "@/components/screen-button";
import { Form } from "@/components/ui/form";
import { ageMask, heightMask, weightMask } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ControlInput from "@/components/control-input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string({ message: "Informe o nome" }),
  weight: z
    .string({ message: "Informe o peso" })
    .min(1, { message: "Informe o peso" })
    .max(6, { message: "Peso inválido" }),
  height: z
    .string({ message: "Informe a altura" })
    .min(1, { message: "Informe a altura" })
    .max(4, { message: "Altura inválida" }),
  age: z
    .string({ message: "Informe a idade" })
    .regex(/^(?:1[01][0-9]|120|[1-9]?[0-9])$/, {
      message: "A idade deve ser entre 0 e 120 anos",
    }),
});

export default function Step() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { setValue, watch, setError } = form;

  const height = watch("height");
  const weight = watch("weight");
  const age = watch("age");

  useEffect(() => {
    setValue("height", heightMask(height));
  }, [height]);

  useEffect(() => {
    setValue("weight", weightMask(weight));
  }, [weight]);

  useEffect(() => {
    setValue("age", ageMask(age));
  }, [age]);

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(
      `/create?step-data=${encodeURIComponent(JSON.stringify(data))}`
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Vamos começar" step="Passo 1" />
      <div className="flex-1 flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full p-4 flex flex-col gap-5"
          >
            <ControlInput
              name="name"
              control={form.control}
              label="Nome"
              placeholder="Nome completo"
            />

            <ControlInput
              name="weight"
              control={form.control}
              label="Peso atual"
              placeholder="Ex: 75"
              maxLength={6}
            />

            <ControlInput
              name="height"
              control={form.control}
              label="Altura"
              placeholder="Ex: 1.80"
              maxLength={4}
            />

            <ControlInput
              name="age"
              control={form.control}
              label="Idade"
              placeholder="Ex: 20"
              maxLength={3}
            />

            <ScreenButton type="submit">Avançar</ScreenButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
