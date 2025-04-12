"use client";
import { useEffect, useState } from "react";
import { ModalSalesEdit } from "./ModalSalesEdit";
import type { Venda } from "../../../types";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const SalesList = () => {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [vendas, setVendas] = useState<Venda[][]>([]);
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleEdit = (sale: Venda) => {
    setVendaSelecionada(sale);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setVendas((prev) =>
      prev
        .map((lista) => lista.filter((venda) => venda.id !== id))
        .filter((lista) => lista.length > 0)
    );
  };

  useEffect(() => {
    async function fetchVendas() {
      try {
        const res = await fetch("/api/sales");
        const data = await res.json();
        const array_sales: Venda[] = data.message;
  
        const chunkSize = 3;
        const groupedSales: Venda[][] = [];
  
        for (let i = 0; i < array_sales.length; i += chunkSize) {
          groupedSales.push(array_sales.slice(i, i + chunkSize));
        }
  
        setVendas(groupedSales);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    }
  
    fetchVendas();
  }, []);

  const handleSave = (vendaAtualizada: Venda) => {
    console.log(vendaAtualizada);
    setVendas((prev) =>
      prev.map((list: Venda[]) =>
        list.map((v) => (v.id === vendaAtualizada.id ? vendaAtualizada : v))
      )
    );
    setIsModalOpen(false);
    setVendaSelecionada(null);
  };

  return (
    <div className="md:w-120 w-90 backdrop-blur-xs p-8 rounded-4xl border-1 border-zinc-900 shadow-2xl text-neutral-300">
      <div className="flex md:flex-col gap-2 md:gap-0 justify-between">
        <div className="flex flex-col mb-8 items-center">
          <h1 className="text-zinc-300 grow text-3xl md:text-5xl font-bold text-shadow-sm relative z-100 text-shadow-black">
            Lista de Vendas
          </h1>
          <div className="from-neutral-400/15 to-zinc-100/60 animate-pulse backdrop-blur-0 bg-gradient-to-r w-[90%] bg-transparent h-0.5 md:top-2 relative"></div>
        </div>
        <div className="flex flex-start">
            <Button
              onClick={() => router.push("/newSale")}
              className="h-10 w-10 md:w-auto mb-4 ml-2 border-black border-2">
                <Plus className="size-6 block md:hidden" />
                <span className="hidden md:block">Registrar Venda</span>
            </Button>
        </div>
      </div>
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="border-1 bg-zinc-800/20 border-zinc-900 p-2 mb-4 rounded-xl hover:bg-zinc-900/20">
        <CarouselContent className=" basis-0 cursor-grab">
          {vendas.map((sale_list, index) => (
            <CarouselItem
              key={index}
              className="mb-2 justify-between block shadow-none border-black items-center">
              {sale_list.map((sale) => (
                <div key={sale.id} className="flex gap-4 text-left items-center justify-between p-4 w-full mt-2 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-2xl border-black border-1">
                  <div>
                    <p>
                      <strong>Nome:</strong> {sale.nome}
                    </p>
                    <p>
                      <strong>Valor:</strong> R$ {sale.valor}
                    </p>
                  </div>
                  <div className="items-center flex h-full md:flex-row gap-2 flex-col">
                    <Button
                      onClick={() => handleEdit(sale)}
                      className=" text-indigo-300 md:w-auto w-full h-10 bg-0 border-2 border-indigo-300">
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(sale.id)}
                      className=" text-green-300 md:w-auto w-full h-10 bg-0 border-2 border-green-300">
                      Deletar
                    </Button>
                  </div>
                </div>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="w-full hidden md:flex justify-end gap-2 ">
        <Button
          onClick={() => api?.scrollTo(current - 1)}
          className="w-8 h-8 border-2 border-indigo-300">
          <ArrowLeft className="text-indigo-300" />
        </Button>
        <Button
          onClick={() => api?.scrollTo(current + 1)}
          className="w-8 h-8 border-2 border-green-300">
          <ArrowRight className="text-green-300" />
        </Button>
      </div>

      {isModalOpen && vendaSelecionada && (
        <ModalSalesEdit
          sale={vendaSelecionada}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SalesList;
