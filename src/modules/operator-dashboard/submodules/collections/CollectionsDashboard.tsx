import { useState } from "react";
import CasesTable from "./components/CasesTable";
import CaseViewModal from "./components/CaseViewModal";
import type { CollectionCase } from "./types";

const initialData: CollectionCase[] = [
  { id: "CL-001", client: "Popescu Ana", amount: 2300, daysLate: 14, status: "In intarziere", agent: "Denis" },
  { id: "CL-002", client: "Ion Vasilescu", amount: 4800, daysLate: 32, status: "PTP activ", agent: "Mihai" },
  { id: "CL-003", client: "Mirela Ionescu", amount: 1200, daysLate: 7, status: "PTP rupt", agent: "Denis" },
  { id: "CL-004", client: "Denis Amanioaiei", amount: 9000, daysLate: 60, status: "Inchis", agent: "Roxana" },
];

export default function CollectionsDashboard() {
  const [data] = useState(initialData);
  const [selectedCase, setSelectedCase] = useState<CollectionCase | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Toate");
  const [agent, setAgent] = useState("");

  const filteredData = data.filter((item) => {
    const matchSearch = item.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "Toate" || item.status === status;
    const matchAgent =
      agent === "" || item.agent.toLowerCase().includes(agent.toLowerCase());
    return matchSearch && matchStatus && matchAgent;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Collections Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Client */}
        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Caută client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Stare */}
        <div>
          <label className="block text-sm font-medium mb-1">Stare</label>
          <select
            className="w-full border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Toate">Toate</option>
            <option value="In intarziere">În întârziere</option>
            <option value="PTP activ">PTP activ</option>
            <option value="PTP rupt">PTP rupt</option>
            <option value="Inchis">Închis</option>
          </select>
        </div>

        {/* Agent */}
        <div>
          <label className="block text-sm font-medium mb-1">Agent</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Caută agent..."
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
          />
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            className="bg-blue-600 text-white px-4 rounded"
            onClick={() => {
              setSearch("");
              setStatus("Toate");
              setAgent("");
            }}
          >
            Resetează filtre
          </button>
        </div>
      </div>

      <CasesTable
        data={filteredData}
        onView={(row) => setSelectedCase(row)}
      />

      {selectedCase && (
        <CaseViewModal
          selectedCase={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
}