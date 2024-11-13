import { useRef, useState } from "react";
import { Check, Cube, FloppyDisk, Package, Plus, PlusCircle } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";

import ComboBox, { ComboBoxOption, ComboBoxRef } from "../../components/forms/ComboBox";
import CurrencyField, { CurrencyFieldRef } from "../../components/forms/CurrencyField";
import MonospacedDisplay from "../../components/MonospacedDisplay";
import NumberField, { NumberFieldRef } from "../../components/forms/NumberField";

interface StockEntry {
  product: number;
  amount: number;
  unitPrice: { value: number; formattedValue: string };
  expirationDate: Date;
  supplier: number;
}

const exampleEntries: StockEntry[] = [
  {
    product: 1,
    amount: 47,
    unitPrice: { value: 3.77, formattedValue: "3,77" },
    expirationDate: new Date(),
    supplier: 1,
  },
  {
    product: 2,
    amount: 22,
    unitPrice: { value: 8.29, formattedValue: "8,29" },
    expirationDate: new Date(),
    supplier: 2,
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
    header: "Custo por unidade",
    accessorKey: "unitPrice.formattedValue",
    cell: (info) => {
      return <MonospacedDisplay content={`R$ ${info.cell.getValue()}`} />;
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
  {
    header: "Fornecedor",
    accessorKey: "supplier",
    cell: (info) => {
      return supplierOptions.find((supplier) => supplier.id === info.cell.getValue())?.label;
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
  { id: 1, label: "Cerveja Heineken Long Neck 330ml" },
  { id: 2, label: "Cerveja Corona Cero Sunbrew Sem Álcool Long Neck 330ml" },
];

const supplierOptions: ComboBoxOption[] = [
  { id: 1, label: "Comper" },
  { id: 2, label: "Extra" },
  { id: 3, label: "Carrefour" },
  { id: 4, label: "Mister Júnior" },
];

function AddStock() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [entries, setEntries] = useState<StockEntry[]>([...exampleEntries]);

  const productSelectRef = useRef<ComboBoxRef>(null);
  const supplierSelectRef = useRef<ComboBoxRef>(null);
  const amountFieldRef = useRef<NumberFieldRef>(null);
  const unitPriceFieldRef = useRef<CurrencyFieldRef>(null);

  function addEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const product = productSelectRef.current?.getSelectedOption();

    if (product === null || product === undefined) {
      return;
    }

    const supplier = supplierSelectRef.current?.getSelectedOption();

    if (supplier === null || supplier === undefined) {
      return;
    }

    const amount = amountFieldRef.current;

    if (amount === null || amount === undefined) {
      return;
    }

    const unitPrice = unitPriceFieldRef.current;

    if (unitPrice === null || unitPrice === undefined) {
      return;
    }

    const entry: StockEntry = {
      product: product.id,
      amount: amount.getValue(),
      unitPrice: { value: unitPrice.getValue(), formattedValue: unitPrice.getFormattedValue() },
      expirationDate: new Date(),
      supplier: supplier.id,
    };

    setEntries((oldEntries) => [entry, ...oldEntries]);
    setModalOpen(false);
  }

  function addProductsToStock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="flex flex-col gap-8 text-xs">
      {/* Page Header */}
      <div className="flex justify-between">
        <PageTitle
          icon={Plus}
          title="Registrar entrada"
          description="Adicionar produtos ao estoque"
          style="border-green-500 bg-green-950 text-green-500"
        />
      </div>
      <form onSubmit={addProductsToStock} className="flex flex-col gap-8 text-neutral-300">
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
              <span className="text-neutral-300">Conteúdo da entrada</span>
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
            emptyMessage="Você ainda não adicionou nenhuma entrada!"
            fillRows
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex h-[32px] items-center gap-2 rounded-md border border-neutral-800 px-2 py-1 text-neutral-400 outline-none"
          >
            <FloppyDisk size={16} weight="bold" className="text-green-500" />
            Registrar entrada
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <PageTitle
          icon={Package}
          title="Adicionar produto"
          description="Adicionar produto ao registro de entrada"
          style="border-green-500 bg-green-950 text-green-500"
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

          {/* Unit Price */}
          <label className="col-span-3 flex flex-col gap-0.5">
            <span>Custo por unidade</span>
            <CurrencyField ref={unitPriceFieldRef} />
          </label>

          {/* Expiration Date */}
          <label htmlFor="expiration-date" className="col-span-3 flex flex-col gap-0.5">
            Data de validade
            <input
              type="date"
              name="expiration-date"
              id="expiration-date"
              className="h-[30px] rounded-md border border-neutral-800 bg-transparent px-2 py-1 font-mono text-sm text-neutral-400 outline-none placeholder:text-neutral-500"
            />
          </label>

          {/* Supplier */}
          <label className="col-span-3 flex flex-col gap-0.5">
            Fornecedor
            <ComboBox ref={supplierSelectRef} placeholder="Selecionar" options={supplierOptions} />
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

export default AddStock;
