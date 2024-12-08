import { useLayoutEffect, useRef, useState } from "react";

import { CaretDown, CaretLeft, CaretRight, CaretUp, CaretUpDown, DotOutline } from "@phosphor-icons/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
  defaultSortingColumn: string;
  pageSize: number;
  fillRows?: boolean;
  emptyMessage: string;
}

function Table<T>({
  data,
  columns,
  onRowClick,
  defaultSortingColumn,
  pageSize,
  emptyMessage,
  fillRows = false,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: defaultSortingColumn,
      desc: true,
    },
  ]);

  const rowRef = useRef<HTMLTableRowElement>(null);
  const [rowHeight, setRowHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (rowRef.current) {
      const { height } = rowRef.current.getBoundingClientRect();
      setRowHeight(height);
    }
  }, []);

  function handleSorting(updater: Updater<SortingState>) {
    return setSorting((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;

      if (next.length === 0) {
        return [
          {
            id: defaultSortingColumn,
            desc: prev[0].id === defaultSortingColumn ? !prev[0].desc : true,
          },
        ];
      }

      return next;
    });
  }

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    initialState: {
      pagination: { pageSize: pageSize },
    },
    onSortingChange: handleSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    sortDescFirst: false,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950">
        <table className="w-full text-xs">
          <thead className="bg-background text-left text-white">
            {table.getHeaderGroups().map((headerGroup, hgIndex) => (
              <tr key={hgIndex} className="border-b border-neutral-800">
                {headerGroup.headers.map((header, hIndex) => (
                  <th key={hIndex} className="whitespace-nowrap p-3 font-normal">
                    <div
                      {...{
                        className: header.column.getCanSort() ? "flex items-center gap-2" : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="text-neutral-500">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <CaretDown size={14} weight="fill" />
                          ) : (
                            <CaretUp size={14} weight="fill" />
                          )
                        ) : (
                          <CaretUpDown size={14} weight="fill" className="invisible" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-neutral-400">
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ height: `${rowHeight * pageSize}px` }}>
                  <div className="flex flex-col items-center justify-center gap-4">{emptyMessage}</div>
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                ref={rowIndex === 0 ? rowRef : null}
                className="group cursor-pointer border-b border-t border-neutral-800 bg-background outline-none first-of-type:border-t-0 last-of-type:border-b-0 hover:bg-neutral-900"
                onClick={() => onRowClick && onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td key={cellIndex} className="whitespace-nowrap px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {fillRows &&
              data.length !== 0 &&
              table.getRowModel().rows.length < pageSize &&
              Array.from({ length: pageSize - table.getRowModel().rows.length }, (_, index) => (
                <tr key={index}>
                  <td colSpan={columns.length} style={{ height: `${rowHeight}px` }}></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data.length !== 0 && (
        <div className="flex items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            {`${data.length} resultados`}
            <DotOutline size={16} weight="fill" />
            {`Mostrando ${table.getState().pagination.pageSize} por página`}
          </div>
          <div className="flex items-center gap-8">
            {`Página ${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()}`}
            <div className="flex gap-2">
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                className="rounded-md bg-neutral-900 p-2 text-neutral-400 outline-none hover:bg-neutral-800 hover:text-white active:bg-neutral-700/75 disabled:bg-neutral-950 disabled:text-neutral-500"
              >
                <CaretLeft size={14} weight="bold" />
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                className="rounded-md bg-neutral-900 p-2 text-neutral-400 outline-none hover:bg-neutral-800 hover:text-white active:bg-neutral-700/75 disabled:bg-neutral-950 disabled:text-neutral-500"
              >
                <CaretRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
