import { useMemo, useRef, useState } from "react";

import { ArrowBendUpRight, ArrowUpRight, Package } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

import StockStatus, { Status } from "./StockStatus";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import Dialog from "../../components/Dialog";
import ExpirationWarning from "./ExpirationWarning";
import DateDisplay from "../../components/DateDisplay";

const PRODUCTS_PER_PAGE = 15;
const INSTANCES_PER_PAGE = 5;

interface Product {
  name: string;
  brand: string;
  stock_status: Status;
  last_restock: Date;
  items: ProductInstance[];
}

interface ProductInstance {
  amount: number;
  registered_by: string;
  registration_date: Date;
  expiration_date: Date;
}

const products: Product[] = [
  {
    name: "Cerveja Heineken Long Neck 330ml",
    brand: "Heineken",
    stock_status: "ideal",
    last_restock: new Date(),
    items: [
      {
        amount: 10,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 1),
        expiration_date: new Date(),
      },
      {
        amount: 23,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 2),
        expiration_date: new Date(),
      },
      {
        amount: 10,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 1),
        expiration_date: new Date(),
      },
      {
        amount: 23,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 2),
        expiration_date: new Date(),
      },
      {
        amount: 10,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 1),
        expiration_date: new Date(),
      },
      {
        amount: 23,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 2),
        expiration_date: new Date(),
      },
      {
        amount: 10,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 1),
        expiration_date: new Date(),
      },
      {
        amount: 23,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 2),
        expiration_date: new Date(),
      },
    ],
  },
  {
    name: "Cerveja Corona Cero Sunbrew Sem Álcool Long Neck 330ml",
    brand: "Corona",
    stock_status: "not_ideal",
    last_restock: new Date(2024, 8, 17),
    items: [
      {
        amount: 10,
        registered_by: "Fulano da Silva",
        registration_date: new Date(2024, 8, 17),
        expiration_date: new Date(),
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
    accessorFn: (row) =>
      `${row.items.map((item) => item.amount).reduce((prev, curr) => prev + curr, 0)}`,
    cell: (info) => {
      return (
        <div className="flex items-center gap-2">
          <StockStatus status={info.row.original.stock_status} tooltip />
          {`${info.cell.getValue()} unidades`}
        </div>
      );
    },
  },
  {
    header: "Última entrada",
    accessorKey: "last_restock",
    cell: (info) => {
      const date = info.getValue() as Date;
      return <DateDisplay content={date.toLocaleDateString()} />;
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
    accessorKey: "expiration_date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return (
        <div className="flex items-center gap-2">
          <DateDisplay content={date.toLocaleDateString()} />
          <ExpirationWarning status="good" singular={false} />
        </div>
      );
    },
  },
  {
    header: "Registrado por",
    accessorKey: "registered_by",
  },
  {
    header: "Data de entrada",
    accessorKey: "registration_date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return (
        <div className="flex items-center justify-between">
          <DateDisplay content={date.toLocaleDateString()} />
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
  const [product, setProduct] = useState<Product>();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const data = useMemo(() => products, []);
  const cols = useMemo(() => columns, []);

  const filteredData = useMemo(() => {
    const searchParts = search.trim().replace(/\s+/g, " ").split(" ");

    return data.filter((product) =>
      search.toLowerCase() === ""
        ? product
        : searchParts.every((part) =>
            product.name.toLowerCase().includes(part),
          ),
    );
  }, [data, search]);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  function handleRowClick(product: Product) {
    setProduct(product);
    toggleDialog();
  }

  return (
    <div className="flex flex-col gap-8 text-sm">
      {/* Page Header */}
      <div className="flex justify-between">
        <PageTitle
          icon={Package}
          title="Produtos"
          description="Todos os produtos em estoque"
          style="border-sky-500 bg-sky-950 text-sky-500"
        />
        <SearchBar
          placeholder="Pesquisar por produto..."
          onSearch={setSearch}
        />
      </div>
      {/* Products Table */}
      <Table
        data={filteredData}
        columns={cols}
        onRowClick={handleRowClick}
        defaultSortingColumn="last_restock"
        pageSize={PRODUCTS_PER_PAGE}
        fillRows
      />
      {/* Legend */}
      <div className="flex flex-col items-center gap-2 text-xs">
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
        <span className="text-neutral-600">
          * Os indicadores são baseados na média de consumo de meses anteriores.
        </span>
      </div>
      {/* Product Instances Dialog */}
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
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
                <ArrowBendUpRight
                  size={14}
                  weight="bold"
                  className="text-green-500"
                />
                <h2>Produtos em estoque:</h2>
              </div>
              <Table
                data={product.items}
                columns={instancesColumns}
                defaultSortingColumn="registration_date"
                pageSize={INSTANCES_PER_PAGE}
                fillRows
              />
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default Products;
