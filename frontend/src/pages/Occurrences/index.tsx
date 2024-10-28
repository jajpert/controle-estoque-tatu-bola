import { useMemo, useState } from "react";

import { WarningCircle } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

import DateDisplay from "../../components/DateDisplay";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";

import OccurrenceType from "./OccurrenceType";

const PRODUCTS_PER_PAGE = 15;

interface Occurrence {
  description: string;
  type: OccurrenceType;
  registered_by: string;
  occurrence_date: Date;
}

const occurrences: Occurrence[] = [
  {
    description: "Reestoque de Outubro",
    type: "in",
    registered_by: "Fulano da Silva",
    occurrence_date: new Date(),
  },
  {
    description: "Consumo Semanal",
    type: "out",
    registered_by: "Fulano da Silva",
    occurrence_date: new Date(),
  },
];

const columns: ColumnDef<Occurrence>[] = [
  {
    header: "Descrição",
    accessorKey: "description",
    cell: (info) => {
      return (
        <div className="flex items-center gap-3">
          <OccurrenceType type={info.row.original.type} />
          <span>{`${info.cell.getValue()}`}</span>
        </div>
      );
    },
  },
  {
    header: "Registrado por",
    accessorKey: "registered_by",
  },
  {
    header: "Data da ocorrência",
    accessorKey: "occurrence_date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return (
        <div className="flex items-center gap-2">
          <DateDisplay content={date.toLocaleDateString()} />
        </div>
      );
    },
  },
];

function Occurrences() {
  const [search, setSearch] = useState<string>("");

  const data = useMemo(() => occurrences, []);
  const cols = useMemo(() => columns, []);

  const filteredData = useMemo(() => {
    const searchParts = search.trim().replace(/\s+/g, " ").split(" ");

    return data.filter((occurrence) =>
      search.toLowerCase() === ""
        ? occurrence
        : searchParts.every((part) =>
            occurrence.description.toLowerCase().includes(part),
          ),
    );
  }, [data, search]);

  return (
    <div className="flex flex-col gap-8 text-sm">
      <div className="flex justify-between">
        {/* Page title & description */}
        <PageTitle
          icon={WarningCircle}
          title="Ocorrências"
          description="Histórico de entradas e saídas"
          style="border-yellow-500 bg-yellow-950 text-yellow-500"
        />
        {/* Search bar */}
        <SearchBar
          placeholder="Pesquisar por ocorrência..."
          onSearch={setSearch}
        />
      </div>
      <Table
        data={filteredData}
        columns={cols}
        onRowClick={() => {}}
        defaultSortingColumn="occurrence_date"
        pageSize={PRODUCTS_PER_PAGE}
        fillRows
      />
    </div>
  );
}

export default Occurrences;
