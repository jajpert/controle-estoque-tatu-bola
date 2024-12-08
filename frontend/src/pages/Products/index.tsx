import { useMemo, useRef, useState } from "react";

import { ArrowBendUpRight, ArrowUpRight, Check, Package, PlusCircle } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

import StockStatus, { Status } from "./StockStatus";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import ExpirationWarning from "./ExpirationWarning";
import MonospacedDisplay from "../../components/MonospacedDisplay";
import Modal from "../../components/Modal";

const PRODUCTS_PER_PAGE = 15;
const INSTANCES_PER_PAGE = 5;

interface Product {
  name: string;
  brand: string;
  stockStatus: Status;
  lastRestock: Date;
  items: ProductInstance[];
}

interface ProductInstance {
  amount: number;
  supplier: string;
  registrationDate: Date;
  expirationDate: Date;
}

const products: Product[] = [
  {
    name: "Cerveja Heineken Long Neck 330ml",
    brand: "Heineken",
    stockStatus: "ideal",
    lastRestock: new Date(),
    items: [
      {
        amount: 10,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 1),
        expirationDate: new Date(),
      },
      {
        amount: 23,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 2),
        expirationDate: new Date(),
      },
      {
        amount: 10,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 1),
        expirationDate: new Date(),
      },
      {
        amount: 23,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 2),
        expirationDate: new Date(),
      },
      {
        amount: 10,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 1),
        expirationDate: new Date(),
      },
      {
        amount: 23,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 2),
        expirationDate: new Date(),
      },
      {
        amount: 10,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 1),
        expirationDate: new Date(),
      },
      {
        amount: 23,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 2),
        expirationDate: new Date(),
      },
    ],
  },
  {
    name: "Cerveja Corona Cero Sunbrew Sem Álcool Long Neck 330ml",
    brand: "Corona",
    stockStatus: "not_ideal",
    lastRestock: new Date(2024, 8, 17),
    items: [
      {
        amount: 10,
        supplier: "Comper",
        registrationDate: new Date(2024, 8, 17),
        expirationDate: new Date(),
      },
    ],
  },
];

const columns: ColumnDef<Product>[] = [
  {
    header: "Nome do produto",
    accessorKey: "name",
  },
  {
    header: "Marca",
    accessorKey: "brand",
  },
  {
    header: "Quantidade",
    accessorFn: (row) => `${row.items.map((item) => item.amount).reduce((prev, curr) => prev + curr, 0)}`,
    cell: (info) => {
      const amount = info.getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <StockStatus status={info.row.original.stockStatus} tooltip />
          {`${info.cell.getValue()} ${amount > 1 ? "unidades" : "unidade"}`}
        </div>
      );
    },
  },
  {
    header: "Última entrada",
    accessorKey: "lastRestock",
    cell: (info) => {
      const date = info.getValue() as Date;
      return <MonospacedDisplay content={date.toLocaleDateString()} />;
    },
  },
];

const instancesColumns: ColumnDef<ProductInstance>[] = [
  {
    header: "Quantidade",
    accessorKey: "amount",
    cell: (info) => {
      return `${info.getValue()} unidades`;
    },
  },
  {
    header: "Data de validade",
    accessorKey: "expirationDate",
    cell: (info) => {
      const date = info.getValue() as Date;
      return (
        <div className="flex items-center gap-2">
          <MonospacedDisplay content={date.toLocaleDateString()} />
          <ExpirationWarning status="good" singular={false} />
        </div>
      );
    },
  },
  {
    header: "Fornecedor",
    accessorKey: "supplier",
  },
  {
    header: "Data de entrada",
    accessorKey: "registrationDate",
    cell: (info) => {
      const date = info.getValue() as Date;
      return (
        <div className="flex items-center justify-between">
          <MonospacedDisplay content={date.toLocaleDateString()} />
          <span className="text-neutral-800 group-hover:text-inherit">
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </div>
      );
    },
  },
];

function Products() {
  const [search, setSearch] = useState<string>("");
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isProductCreationModalOpen, setProductCreationModalOpen] = useState(false);
  const [product, setProduct] = useState<Product>();

  const productNameRef = useRef<HTMLInputElement>(null);

  const data = useMemo(() => products, []);
  const cols = useMemo(() => columns, []);

  const filteredData = useMemo(() => {
    const parts = search.toLowerCase().trim().replace(/\s+/g, " ").split(" ");

    return data.filter((product) =>
      search.toLowerCase() === "" ? product : parts.every((part) => product.name.toLowerCase().includes(part)),
    );
  }, [data, search]);

  function handleRowClick(product: Product) {
    setProduct(product);
    setProductModalOpen(true);
  }

  return (
    <div className="flex flex-col gap-8 text-xs">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <PageTitle
          icon={Package}
          title="Produtos"
          description="Todos os produtos em estoque"
          style="border-sky-500 bg-sky-950 text-sky-500"
        />
        <div className="flex justify-between gap-4 lg:justify-normal">
          <button
            onClick={() => setProductCreationModalOpen(true)}
            className="flex items-center gap-2 rounded-md border border-neutral-800 px-2 py-1 text-neutral-400 outline-none"
          >
            <PlusCircle size={16} weight="bold" className="text-sky-500" />
            Novo produto
          </button>
          <SearchBar placeholder="Pesquisar por produto..." onSearch={setSearch} />
        </div>
      </div>

      {/* Products Table */}
      <Table
        data={filteredData}
        columns={cols}
        onRowClick={handleRowClick}
        defaultSortingColumn="lastRestock"
        pageSize={PRODUCTS_PER_PAGE}
        emptyMessage="Desculpe, nenhum produto encontrado!"
        fillRows
      />

      {/* Legend */}
      <div className="flex flex-col items-center gap-2">
        <span className="pb-2 font-medium">Legenda</span>
        <div className="flex gap-6 text-neutral-400">
          <div className="flex items-center gap-2">
            <StockStatus status="ideal" />
            Quantidade ideal
          </div>
          <div className="flex items-center gap-2">
            <StockStatus status="not_ideal" />
            Quantidade não ideal
          </div>
          <div className="flex items-center gap-2">
            <StockStatus status="low" />
            Quantidade baixa
          </div>
        </div>
        <span className="text-neutral-600">* Os indicadores são baseados na média de consumo de meses anteriores.</span>
      </div>

      {/* Product Instances Modal */}
      <Modal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)}>
        {product && (
          <>
            <PageTitle
              icon={Package}
              title={product.name}
              description={product.brand}
              style="border-neutral-500 bg-neutral-900 text-neutral-500"
            />
            {/* Product Instances Table */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <ArrowBendUpRight size={14} weight="bold" className="text-green-500" />
                <h2>Produtos em estoque:</h2>
              </div>
              <Table
                data={product.items}
                columns={instancesColumns}
                defaultSortingColumn="registrationDate"
                pageSize={INSTANCES_PER_PAGE}
                emptyMessage="Desculpe, nenhuma instância do produto foi encontrada!"
                fillRows
              />
            </div>
          </>
        )}
      </Modal>

      {/* Product Creation Modal */}
      <Modal isOpen={isProductCreationModalOpen} onClose={() => setProductCreationModalOpen(false)}>
        <PageTitle
          icon={Package}
          title="Novo produto"
          description="Crie um novo produto"
          style="border-sky-500 bg-sky-950 text-sky-500"
        />
        <form onSubmit={() => {}} className="grid grid-cols-9 gap-4 text-neutral-300">
          <label className="col-span-6 flex flex-col gap-0.5">
            Nome do produto
            <input
              type="text"
              ref={productNameRef}
              className="flex h-[30px] items-center justify-between overflow-hidden rounded-md border border-neutral-800 bg-transparent px-2 py-1 outline-none"
            />
          </label>
          <label className="col-span-3 flex flex-col gap-0.5">
            Marca
            <input
              type="text"
              ref={productNameRef}
              className="flex h-[30px] items-center justify-between overflow-hidden rounded-md border border-neutral-800 bg-transparent px-2 py-1 outline-none"
            />
          </label>
          <div className="col-span-full flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setProductCreationModalOpen(false)}
              className="px-2 py-1 text-neutral-500 outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex h-[30px] items-center gap-2 rounded-md border border-neutral-800 px-2 py-1 text-neutral-400 outline-none"
            >
              <Check size={16} weight="bold" className="text-green-500" />
              Criar produto
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Products;
