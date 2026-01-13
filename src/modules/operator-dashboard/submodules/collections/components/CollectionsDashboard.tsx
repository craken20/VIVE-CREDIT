import React, { useState } from 'react';
import CasesTable from '../components/CasesTable';
import CaseViewModal from '../components/CaseViewModal';
import DocsModal from '../components/DocsModal';

// Mock data pentru 36 clienți (3 pagini x 12 clienți)
const generateMockCases = () => {
  const statuses = ['În întârziere', 'PTP activ', 'PTP rupt', 'Închis'];
  const agents = ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4'];
  const cases = [];

  for (let i = 1; i <= 36; i++) {
    cases.push({
      id: i,
      clientName: `Client ${i}`,
      client: {
        name: `Client ${i}`,
        cnp: `${1990000000000 + i}`,
        phone: `0${700000000 + i}`,
        email: `client${i}@example.com`,
        address: `Strada Exemplu ${i}, București`,
      },
      phone: `0${700000000 + i}`,
      amount: Math.floor(Math.random() * 10000) + 1000,
      daysOverdue: Math.floor(Math.random() * 90),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      agent: agents[Math.floor(Math.random() * agents.length)],
      lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ro-RO'),
      cnp: `${1990000000000 + i}`,
      address: `Strada Exemplu ${i}, București`,
      email: `client${i}@example.com`,
      contractNumber: `CNT-${10000 + i}`,
      ptpActive: Math.random() > 0.5,
      ptpDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ro-RO'),
      ptpAmount: Math.floor(Math.random() * 5000) + 500,
    });
  }

  return cases;
};

const CollectionsDashboard: React.FC = () => {
  const [allCases] = useState(generateMockCases());
  const [filteredCases, setFilteredCases] = useState(allCases);
  
  // Filtre
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [agentFilter, setAgentFilter] = useState('');
  
  // Paginare
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 12;

  
  
  // Modale
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  // Aplicare filtre
  React.useEffect(() => {
    let filtered = allCases;

    if (clientFilter) {
      filtered = filtered.filter(c => 
        c.clientName.toLowerCase().includes(clientFilter.toLowerCase()) ||
        c.phone.includes(clientFilter)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (agentFilter) {
      filtered = filtered.filter(c => c.agent === agentFilter);
    }

    setFilteredCases(filtered);
    setCurrentPage(1); // Reset la prima pagină când se schimbă filtrele
  }, [clientFilter, statusFilter, agentFilter, allCases]);

  // Paginare
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  // Handlers
  const handleViewCase = (caseData: any) => {
    setSelectedCase(caseData);
    setIsViewModalOpen(true);
  };

  const handleOpenDocs = (caseData: any) => {
    setSelectedCase(caseData);
    setIsDocsModalOpen(true);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Collections Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gestionare cazuri colectare - Total: {filteredCases.length} cazuri
        </p>
      </div>

      {/* Filtre */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtru Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Caută Client / Telefon
            </label>
            <input
              type="text"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              placeholder="Nume sau telefon..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtru Stare */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stare
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toate stările</option>
              <option value="În întârziere">În întârziere</option>
              <option value="PTP activ">PTP activ</option>
              <option value="PTP rupt">PTP rupt</option>
              <option value="Închis">Închis</option>
            </select>
          </div>

          {/* Filtru Agent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Agent
            </label>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toți agenții</option>
              <option value="Agent 1">Agent 1</option>
              <option value="Agent 2">Agent 2</option>
              <option value="Agent 3">Agent 3</option>
              <option value="Agent 4">Agent 4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <CasesTable
        data={currentCases as any}
        onView={handleViewCase}
        onDocs={handleOpenDocs}
      />

      {/* Paginare */}
      <div className="mt-6 flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Afișare {indexOfFirstCase + 1} - {Math.min(indexOfLastCase, filteredCases.length)} din {filteredCases.length} cazuri
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors
              ${currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Previous
          </button>
          
          <div className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
            Pagina {currentPage} din {totalPages}
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors
              ${currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modale */}
      {selectedCase && (
        <>
          <CaseViewModal
            open={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            selectedCase={selectedCase}
          />
          
          <DocsModal
            open={isDocsModalOpen}
            onClose={() => setIsDocsModalOpen(false)}
            selectedCase={selectedCase}
          />
        </>
      )}
    </div>
  );
};

export default CollectionsDashboard;