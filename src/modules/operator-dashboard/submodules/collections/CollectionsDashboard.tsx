import { useState } from "react";
import CasesTable from "./components/CasesTable";
import type { CollectionCase } from "./types";

const initialData: CollectionCase[] = [
  { id: "CL-001", client: "Popescu Ana", amount: 2300, daysLate: 14, status: "In intarziere" },
  { id: "CL-002", client: "Ion Vasilescu", amount: 4800, daysLate: 32, status: "PTP activ" },
  { id: "CL-003", client: "Mirela Ionescu", amount: 1200, daysLate: 7, status: "PTP rupt" },
  { id: "CL-004", client: "Denis Amanioaiei", amount: 9000, daysLate: 60, status: "Inchis" },
];

export default function CollectionsDashboard() {
  const [data, setData] = useState(initialData);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Toate");
  const [agent, setAgent] = useState("Toti");

  const filteredData = data.filter((item) => {
    const matchSearch = item.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "Toate" || item.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Collections Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Cauta client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Toate</option>
          <option>In intarziere</option>
          <option>PTP activ</option>
          <option>PTP rupt</option>
          <option>Inchis</option>
        </select>

        <select className="border p-2 rounded" value={agent} onChange={(e) => setAgent(e.target.value)}>
          <option>Toti</option>
          <option>Agent 1</option>
          <option>Agent 2</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={() => {
            setSearch("");
            setStatus("Toate");
            setAgent("Toti");
          }}
        >
          Reseteaza filtre
        </button>
      </div>

      <CasesTable data={filteredData} />
    </div>
  );
}
