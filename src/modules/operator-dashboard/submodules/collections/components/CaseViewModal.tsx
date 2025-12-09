import type { CollectionCase } from "../types";

interface Props {
  selectedCase: CollectionCase;
  onClose: () => void;
}

export default function CaseViewModal({ selectedCase, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Detalii Client</h2>
        <div className="space-y-2 text-sm">
          <p><b>ID:</b> {selectedCase.id}</p>
          <p><b>Client:</b> {selectedCase.client}</p>
          <p><b>Suma:</b> {selectedCase.amount} RON</p>
          <p><b>Zile întârziere:</b> {selectedCase.daysLate}</p>
          <p><b>Status:</b> {selectedCase.status}</p>
          <p><b>Agent:</b> {selectedCase.agent}</p>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Printează
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Salvează
          </button>
        </div>
      </div>
    </div>
  );
}