"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateNewSale = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const handleRegisterSale = () => {
    if (name === "" || price === "") {
      toast.error("Preencha todos os campos.", {
        unstyled: true,
        className:
          "bg-neutral-700/80 rounded-xl w-full gap-4 flex items-center font-mono text-indigo-300 p-4 border-1 border-zinc-900",
        duration: 1500,
        position: `top-center`,
      });
      return;
    }
    toast("Venda registrada com sucesso!", {
      unstyled: true,
      className:
        "w-full bg-neutral-700/80 rounded-xl font-mono text-indigo-300 p-4 border-1 border-zinc-900",
      description: (
        <div className="w-full text-center justify-center text-md flex items-center gap-2 px-2">
          <b className="text-white underline">Nome:</b>
          <span>{name}</span>
          <b className="text-white underline">Valor:</b>
          <span className="text-green-400">R$ {price}</span>
        </div>
      ),

      duration: 2000,
      position: `top-center`,
    });
    setTimeout(() => {
      if (typeof window !== "undefined") {
        router.push("/");
      }
    }, 1500);
  };

  return (
    <div className="w-[380px]">
      <Card className="bg-transparent p-2 backdrop-blur-xs py-10 border-1 border-zinc-900">
        <CardHeader>
          <CardTitle className="underline text-2xl text-indigo-300 mb-2 font-bold underline-offset-4">
            Cadastrar nova venda
          </CardTitle>
          <CardDescription className="text-neutral-100 text-sm font-mono">
            Preencha as informações de preço e nome para concluir cadastro da venda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-md text-neutral-200 pl-2">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Nome da venda"
                  className="bg-white/70 border-1 border-zinc-900"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-md text-neutral-200 pl-2">
                  Preço
                </Label>
                <NumericFormat
                  className="bg-white/70 border-1 border-zinc-900"
                  customInput={Input}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <Button
            className="text-green-300 md:w-auto w-full h-10 bg-0 border-2 border-green-300"
            onClick={handleRegisterSale}>
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateNewSale;
