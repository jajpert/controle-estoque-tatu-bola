import React, { useRef, useState } from "react";
import {
  ArrowUpRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  DotOutline,
  MagnifyingGlass,
  Package,
} from "@phosphor-icons/react";
import StockStatus from "./StockStatus";
import ExpirationWarning from "./ExpirationWarning";

interface Product {
  name: string;
  brand: string;
  status: "ideal" | "not-ideal" | "low";
  items: {
    amount: number;
    expiration_date: string;
    registered_by: string;
    registration_date: string;
    expiration_status: "good" | "to-expire" | "expired";
  }[];
}

const data: Product[] = [
  {
    name: "Cerveja Heineken Long Neck 330ml",
    brand: "Heineken",
    status: "ideal",
    items: [
      {
        amount: 10,
        expiration_date: "21/11/2024",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "to-expire",
      },
      {
        amount: 73,
        expiration_date: "12/12/2024",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "expired",
      },
      {
        amount: 51,
        expiration_date: "08/01/2025",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "good",
      },
      {
        amount: 39,
        expiration_date: "23/04/2025",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "to-expire",
      },
    ],
  },
  {
    name: "Cerveja Spaten Puro Malte Lata 269ml",
    brand: "Spaten",
    status: "not-ideal",
    items: [
      {
        amount: 8,
        expiration_date: "07/03/2026",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "good",
      },
      {
        amount: 24,
        expiration_date: "07/03/2026",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "to-expire",
      },
      {
        amount: 18,
        expiration_date: "07/03/2026",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "good",
      },
    ],
  },
  {
    name: "Cerveja Corona Cero Sunbrew Sem Álcool Long Neck 330ml",
    brand: "Corona",
    status: "low",
    items: [
      {
        amount: 21,
        expiration_date: "07/03/2026",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "good",
      },
      {
        amount: 3,
        expiration_date: "07/03/2026",
        registered_by: "Fulano da Silva",
        registration_date: "11/10/2024",
        expiration_status: "expired",
      },
    ],
  },
];

const products: Product[] = data.concat(...Array(5).fill(data));

const Products: React.FC = () => {
  const [searchedProducts, setSearchedProducts] = useState<Product[]>(products);
  const [dialogProduct, setDialogProduct] = useState<Product>(products[0]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const productsPerPage = 20;

  const filterProducts = (search: string) => {
    const searchParts = search.trim().replace(/\s+/g, " ").split(" ");

    return products.filter((product) =>
      search.toLowerCase() === ""
        ? product
        : searchParts.every((part) =>
            product.name.toLowerCase().includes(part),
          ),
    );
  };

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  return (
    <div className="flex flex-col gap-8 text-sm">
      {/* Page header */}
      <div className="flex justify-between">
        {/* Page title & description */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-sky-500 bg-sky-950 text-sky-500">
            <Package size={16} weight="bold" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h1 className="font-bold leading-4">Produtos</h1>
            <span className="text-xs leading-3 text-neutral-400">
              Todos os produtos em estoque
            </span>
          </div>
        </div>
        {/* Search bar */}
        <div className="relative flex rounded-md border border-neutral-900 text-xs focus-within:border-neutral-800">
          <input
            type="text"
            className="w-96 bg-transparent py-1 pl-2 pr-7 text-white outline-none placeholder:text-neutral-600"
            placeholder="Pesquisar por produto..."
            onChange={(e) =>
              setSearchedProducts(filterProducts(e.target.value))
            }
          />
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 px-2 text-neutral-600 transition-colors">
            <MagnifyingGlass size={14} weight="bold" />
          </span>
        </div>
      </div>
      {/* Product list */}
      <div className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-md border border-neutral-900">
          <table className="w-full text-xs">
            <thead className="text-left text-white">
              <tr className="border-b border-neutral-900">
                <th className="w-full whitespace-nowrap p-3 font-medium">
                  <div className="flex cursor-pointer items-center gap-2">
                    Nome do produto
                    <CaretDown size={12} weight="fill" className="hidden" />
                  </div>
                </th>
                <th className="w-0 whitespace-nowrap p-3 font-medium">
                  <div className="flex cursor-pointer items-center gap-2">
                    Marca
                    <CaretDown size={12} weight="fill" className="hidden" />
                  </div>
                </th>
                <th className="w-0 whitespace-nowrap p-3 font-medium">
                  <div className="flex cursor-pointer items-center gap-2">
                    Quantidade
                    <CaretDown size={12} weight="fill" className="hidden" />
                  </div>
                </th>
                <th className="w-0 whitespace-nowrap p-3 font-medium">
                  <div className="flex cursor-pointer items-center gap-2">
                    Última entrada
                    <CaretDown size={12} weight="fill" className="block" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              {/* No products found */}
              {searchedProducts.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex flex-col items-center justify-center gap-4 py-16">
                      Desculpe, nenhum produto encontrado!
                    </div>
                  </td>
                </tr>
              )}
              {searchedProducts.map((product, index) => (
                <tr
                  className="cursor-pointer border-b border-t border-neutral-900 first-of-type:border-t-0 last-of-type:border-b-0 hover:bg-neutral-950"
                  key={index}
                  onClick={() => {
                    setDialogProduct(products[index]);
                    toggleDialog();
                  }}
                >
                  <td className="w-full whitespace-nowrap px-3 py-2">
                    {product.name}
                  </td>
                  <td className="w-0 whitespace-nowrap px-3 py-2">
                    {product.brand}
                  </td>
                  <td className="w-0 whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <StockStatus status={product.status} show_tooltip />
                      {`${product.items.map((item) => item.amount).reduce((prev, curr) => prev + curr)} unidades`}
                    </div>
                  </td>
                  <td className="w-0 whitespace-nowrap px-3 py-2">
                    <span className="block w-min rounded-md bg-neutral-900 px-2 py-1 font-mono font-semibold leading-3">
                      11/10/2024
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {searchedProducts.length !== 0 && (
          <div className="flex items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-1">
              {`${searchedProducts.length} produtos encontrados`}
              <DotOutline size={16} weight="fill" />
              {`Mostrando ${productsPerPage} por página`}
            </div>
            <div className="flex items-center gap-8">
              Página 1 de 1
              <div className="flex gap-2">
                <button className="cursor-not-allowed rounded-md bg-neutral-950 p-2 text-neutral-500">
                  <CaretLeft size={16} weight="bold" />
                </button>
                <button className="cursor-not-allowed rounded-md bg-neutral-950 p-2 text-neutral-500">
                  <CaretRight size={16} weight="bold" />
                </button>
                {/* <button className="rounded-md bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 active:bg-neutral-700">
                  <CaretLeft size={16} weight="bold" />
                </button>
                <button className="rounded-md bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 active:bg-neutral-700">
                  <CaretRight size={16} weight="bold" />
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-col items-center gap-2 text-xs">
        <span className="pb-2 font-medium">Legenda</span>
        <div className="flex gap-6 text-neutral-400">
          <div className="flex items-center gap-2">
            <StockStatus status="ideal" />
            Quantidade ideal
          </div>
          <div className="flex items-center gap-2">
            <StockStatus status="not-ideal" />
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

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClick={(e) => e.currentTarget === e.target && toggleDialog()}
        className="w-full rounded-lg bg-background p-2 text-xs text-inherit backdrop:bg-neutral-900/75 lg:w-3/4"
      >
        <div className="flex flex-col gap-4 rounded-md border-2 border-neutral-800 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 bg-neutral-900 text-neutral-500">
              <Package size={16} weight="bold" />
            </div>
            <div className="flex flex-col justify-center gap-0.5">
              <h1 className="font-bold leading-4">{dialogProduct.name}</h1>
              <span className="leading-3 text-neutral-400">
                {dialogProduct.brand}
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-neutral-900">
            <table className="w-full">
              <thead className="text-left text-white">
                <tr className="border-b border-neutral-900">
                  <th className="w-1/4 whitespace-nowrap p-3 font-medium">
                    Quantidade
                  </th>
                  <th className="w-1/4 whitespace-nowrap p-3 font-medium">
                    Registrado por
                  </th>
                  <th className="w-1/4 whitespace-nowrap p-3 font-medium">
                    Data da entrada
                  </th>
                  <th className="w-1/4 whitespace-nowrap p-3 font-medium">
                    Data de validade
                  </th>
                  <th className="w-0 whitespace-nowrap p-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                {dialogProduct.items.map((item, index) => (
                  <tr
                    className="group cursor-pointer border-b border-t border-neutral-900 first-of-type:border-t-0 last-of-type:border-b-0 hover:bg-neutral-950"
                    key={index}
                  >
                    <td className="w-1/4 px-3 py-2">{item.amount} unidades</td>
                    <td className="w-1/4 px-3 py-2">{item.registered_by}</td>
                    <td className="w-1/4 px-3 py-2">
                      <span className="block w-min rounded-md bg-neutral-900 px-2 py-1 font-mono font-semibold leading-3">
                        {item.registration_date}
                      </span>
                    </td>
                    <td className="w-1/4 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="block w-min rounded-md bg-neutral-900 px-2 py-1 font-mono font-semibold leading-3">
                          {item.expiration_date}
                        </span>
                        {item.expiration_status !== "good" && (
                          <ExpirationWarning
                            expired={item.expiration_status === "expired"}
                            singular={item.amount === 1}
                          />
                        )}
                      </div>
                    </td>
                    <td className="w-0 px-3 py-2">
                      <span
                        className="text-transparent text-zinc-500 group-hover:text-white"
                        title="Visualizar registro de entrada"
                      >
                        <ArrowUpRight size={14} weight="bold" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-neutral-400">
              {`${dialogProduct.items.map((item) => item.amount).reduce((prev, curr) => prev + curr)} unidades no total`}
              <DotOutline size={16} weight="fill" />
              {`${24} ${dialogProduct.items.length === 1 ? "unidade" : "unidades"} prestes a vencer`}
            </span>
            <button
              className="rounded-md bg-neutral-900 px-4 py-2 text-neutral-400 outline-none hover:bg-neutral-800 hover:text-white"
              onClick={toggleDialog}
            >
              Voltar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Products;
