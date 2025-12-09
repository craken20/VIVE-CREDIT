import { Rows } from "lucide-react";
import type { CollectionCase } from "../types";

interface Props {
  data: CollectionCase[];
  onView: (row: CollectionCase) => void;
}

export default function CasesTable({ data ,onView}: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="p-3">ID</th>
          <th className="p-3">Client</th>
          <th className="p-3">Suma Restanta</th>
          <th className="p-3">Zile intarziere</th>
          <th className="p-3">Status</th>
          <th className="p-3">Agent</th>
          <th className="p-3">Actiuni</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b">
            <td className="p-3">{row.id}</td>
            <td className="p-3">{row.client}</td>
            <td className="p-3">{row.amount} RON</td>
            <td className="p-3">{row.daysLate} zile</td>

            <td className="p-3">
              <span className="px-3 py-1 rounded-full text-sm bg-yellow-100">
                {row.status}
              </span>
            </td>

            <td className="p-3">{row.agent ?? "N/A"}</td>

            <td className="p-3">
              <button
              onClick={() => onView(row)}
               className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
                
                View
              </button>
            
              <button className="bg-gray-700 text-white px-3 py-1 rounded">
                Docs
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}