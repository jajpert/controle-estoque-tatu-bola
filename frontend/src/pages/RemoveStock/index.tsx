import { useRef, useState } from "react";

import { Check, Cube, FloppyDisk, Package, PlusCircle, X } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import MonospacedDisplay from "../../components/MonospacedDisplay";
import Modal from "../../components/Modal";
import ComboBox, { ComboBoxOption, ComboBoxRef } from "../../components/forms/ComboBox";
import NumberField, { NumberFieldRef } from "../../components/forms/NumberField";

interface StockEntry {
  product: number;
  amount: number;
  expirationDate: Date;
}

const exampleEntries: StockEntry[] = [
  {
    product: 1,
    amount: 47,
    expirationDate: new Date(),
  },
  {
    product: 2,
    amount: 22,
    expirationDate: new Date(),
  },
];

const columns: ColumnDef<StockEntry>[] = [
  {
    header: "Produto",
    accessorKey: "product",
    cell: (info) => {
      const product = products.find((product) => product.id === info.cell.getValue());
      const brand = brands.find((brand) => brand.id === product?.brand);

      return (
        <div className="flex items-center gap-3">
          <span className="rounded-full text-neutral-500">
            <Cube size={14} weight="bold" />
          </span>
          {`${product?.name} - ${brand?.name}`}
        </div>
      );
    },
  },
  {
    header: "Quantidade",
    accessorKey: "amount",
    cell: (info) => {
      const amount = info.getValue() as number;
      return `${info.cell.getValue()} ${amount > 1 ? "unidades" : "unidade"}`;
    },
  },
  {
    header: "Data de validade",
    accessorKey: "expirationDate",
    cell: (info) => {
      const date = info.getValue() as Date;
      return <MonospacedDisplay content={date.toLocaleDateString()} />;
    },
  },
];

const brands = [
  { id: 1, name: "Heineken" },
  { id: 2, name: "Corona" },
];

const products: { id: number; name: string; brand: number }[] = [
  { id: 1, name: "Cerveja Heineken Long Neck 330ml", brand: 1 },
  { id: 2, name: "Cerveja Corona Cero Sunbrew Sem Álcool Long Neck 330ml", brand: 2 },
];

const productOptions: ComboBoxOption[] = [
  { id: 1, label: `Cerveja Heineken Long Neck 330ml - Validade: ${new Date().toLocaleDateString("pt-BR")}` },
  {
    id: 2,
    label: `Cerveja Corona Cero Sunbrew Sem Álcool Long Neck 330ml - Validade: ${new Date().toLocaleDateString("pt-BR")}`,
  },
];

function RemoveStock() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [entries, setEntries] = useState<StockEntry[]>([...exampleEntries]);

  const productSelectRef = useRef<ComboBoxRef>(null);
  const amountFieldRef = useRef<NumberFieldRef>(null);

  function addEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const product = productSelectRef.current?.getSelectedOption();

    if (product === null || product === undefined) {
      return;
    }

    const amount = amountFieldRef.current;

    if (amount === null || amount === undefined) {
      return;
    }

    const entry: StockEntry = {
      product: product.id,
      amount: amount.getValue(),
      expirationDate: new Date(),
    };

    setEntries((oldEntries) => [entry, ...oldEntries]);
    setModalOpen(false);
  }

  function removeProductsFromStock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="flex flex-col gap-8 text-xs">
      <div className="flex justify-between">
        <PageTitle
          icon={X}
          title="Registrar saída"
          description="Remover produtos do estoque"
          style="border-red-500 bg-red-950 text-red-500"
        />
      </div>
      <form onSubmit={removeProductsFromStock} className="flex flex-col gap-8 text-neutral-300">
        {/* Description */}
        <label htmlFor="description" className="flex flex-col gap-0.5">
          Descrição do registro
          <input
            type="text"
            className="h-[30px] rounded-md border border-neutral-800 bg-transparent px-2 py-1 text-neutral-400 outline-none placeholder:text-neutral-500"
          />
        </label>

        {/* Stock Entries */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-neutral-800 bg-neutral-900 p-1.5 text-neutral-400">
                <Package size={16} weight="bold" />
              </span>
              <span className="text-neutral-300">Conteúdo da saída</span>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex h-[32px] items-center gap-2 rounded-md border border-neutral-800 px-2 py-1 text-neutral-400 outline-none"
            >
              <PlusCircle size={16} weight="bold" className="text-neutral-500" />
              Adicionar produto
            </button>
          </div>
          <Table
            data={entries}
            columns={columns}
            onRowClick={() => {}}
            defaultSortingColumn="expirationDate"
            pageSize={10}
            emptyMessage="Você ainda não adicionou nenhuma saída!"
            fillRows
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex h-[32px] items-center gap-2 rounded-md border border-neutral-800 px-2 py-1 text-neutral-400 outline-none"
          >
            <FloppyDisk size={16} weight="bold" className="text-green-500" />
            Registrar saída
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <PageTitle
          icon={Package}
          title="Adicionar produto"
          description="Adicionar produto ao registro de saída"
          style="border-red-500 bg-red-950 text-red-500"
        />
        <form onSubmit={addEntry} className="grid grid-cols-9 gap-4 text-neutral-300">
          {/* Product */}
          <label className="col-span-6 flex flex-col gap-0.5">
            Produto
            <ComboBox ref={productSelectRef} placeholder="Selecionar" options={productOptions} />
          </label>

          {/* Amount */}
          <label className="col-span-3 flex flex-col gap-0.5">
            Quantidade
            <NumberField ref={amountFieldRef} min={1} max={1000} />
          </label>

          <div className="col-span-full flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-2 py-1 text-neutral-500 outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex h-[30px] items-center gap-2 rounded-md border border-neutral-800 px-2 py-1 text-neutral-400 outline-none"
            >
              <Check size={16} weight="bold" className="text-green-500" />
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RemoveStock;
