'use client';

import { Issuer } from '@/app/types/receipt';

interface IssuerSelectorProps {
  issuers: Issuer[];
  selectedIssuerId: string | null;
  onSelectIssuer: (issuer: Issuer | null) => void;
  onOpenModal: () => void;
}

export default function IssuerSelector({
  issuers,
  selectedIssuerId,
  onSelectIssuer,
  onOpenModal,
}: IssuerSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const issuerId = e.target.value;
    if (issuerId === '') {
      onSelectIssuer(null);
    } else {
      const issuer = issuers.find((i) => i.id === issuerId);
      if (issuer) {
        onSelectIssuer(issuer);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">Emitente:</h3>
        <select
          value={selectedIssuerId || ''}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">Selecione ou preencha manualmente...</option>
          {issuers.map((issuer) => (
            <option key={issuer.id} value={issuer.id}>
              {issuer.nome} - {issuer.cpfCnpj}
            </option>
          ))}
        </select>
        <button
          onClick={onOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition whitespace-nowrap"
        >
          Gerenciar
        </button>
      </div>
    </div>
  );
}
