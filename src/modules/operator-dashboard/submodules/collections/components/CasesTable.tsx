import type { CollectionCase } from "../types";

interface Props {
  data: CollectionCase[];
  onView: (row: CollectionCase) => void;
  onDocs: (row: CollectionCase) => void;
}

export default function CasesTable({ data, onView, onDocs }: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b border-gray-200 dark:border-gray-700">
          <th className="p-3 text-gray-900 dark:text-white">ID</th>
          <th className="p-3 text-gray-900 dark:text-white">Client</th>
          <th className="p-3 text-gray-900 dark:text-white">Suma Restanta</th>
          <th className="p-3 text-gray-900 dark:text-white">Zile intarziere</th>
          <th className="p-3 text-gray-900 dark:text-white">Status</th>
          <th className="p-3 text-gray-900 dark:text-white">Agent</th>
          <th className="p-3 text-gray-900 dark:text-white">Actiuni</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 text-gray-900 dark:text-white">{row.id}</td>
            <td className="p-3 text-gray-900 dark:text-white">{row.client}</td>
            <td className="p-3 text-gray-900 dark:text-white">{row.amount} RON</td>
            <td className="p-3 text-gray-900 dark:text-white">{row.daysLate} zile</td>

            <td className="p-3">
             <span className={`px-3 py-1 rounded-full text-sm font-medium ${
             row.status === "In intarziere" 
               ? "bg-yellow-100 text-yellow-800"
               : row.status === "PTP activ"
               ? "bg-blue-100 text-blue-800"
               : row.status === "PTP rupt"
               ? "bg-red-100 text-red-800"
               : row.status === "Inchis"
               ? "bg-green-100 text-green-800"
               : "bg-gray-100 text-gray-800"
              }`}>
                {row.status}
              </span>
            </td>

            <td className="p-3 text-gray-900 dark:text-white">{row.agent ?? "N/A"}</td>

            <td className="p-3">
              <button
                onClick={() => onView(row)}
                className="px-4 py-1 bg-blue-600 text-white rounded-lg mr-2"
              >
                View
              </button>
            
              <button 
                onClick={() => onDocs(row)}
                className="px-4 py-1 bg-blue-600 text-white rounded-lg"
              >
                Docs
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}