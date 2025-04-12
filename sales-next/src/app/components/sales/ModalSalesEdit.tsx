"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { useState, useEffect } from "react";
  import { Button } from "@/components/ui/button";
  import { Venda } from "../../../types";
  import { Check, X } from "lucide-react";
  import { Input } from "@/components/ui/input";
  import { NumericFormat } from "react-number-format";
  
  type Props = {
    sale: Venda;
    onClose: () => void;
    onSave: (sale: Venda) => void;
  };
  
  export function ModalSalesEdit({ sale, onClose, onSave }: Props) {
    const [salesData, setFormData] = useState<Venda>(sale);
  
    useEffect(() => {
      setFormData(sale);
    }, [sale]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...salesData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      salesData.valor = String(salesData.valor).replace("R$ ", "").replace(/\./g, "").replace(",", ".");
      onSave(salesData);
    };
  
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="bg-neutral-100">
          <DialogHeader>
            <DialogTitle className="text-2xl">Editar Venda</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-black">
            Sobrescreva os dados que você deseja editar.
          </DialogDescription>
  
          <div className="">
            <h3 className="pl-2 text-sm underline mb-1">
              <b>Nome</b> da venda
            </h3>
            <Input
              type="text"
              name="nome"
              value={salesData.nome}
              onChange={handleChange}
              className="border p-2 w-full mb-4 border-zinc-800"
              placeholder="Nome da venda"
            />
          </div>
          <div>
            <h3 className="pl-2 text-sm underline mb-1">
              <b>Valor</b> da venda
            </h3>
            <NumericFormat
              onChange={handleChange}
              className="border p-2 w-full mb-4 border-zinc-800"
              placeholder="R$ 0,00"
              customInput={Input}
              value={salesData.valor}
              name="valor"
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
            />
          </div>
  
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" /> Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <Check className="w-4 h-4 mr-2" /> Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  