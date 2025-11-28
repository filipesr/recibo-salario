'use client';

import { Payer } from '@/app/types/receipt';

interface PayerSelectorProps {
  payers: Payer[];
  selectedPayerId: string | null;
  onSelectPayer: (payer: Payer | null) => void;
  onOpenModal: () => void;
}

export default function PayerSelector({
  payers,
  selectedPayerId,
  onSelectPayer,
  onOpenModal,
}: PayerSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payerId = e.target.value;
    if (payerId === '') {
      onSelectPayer(null);
    } else {
      const payer = payers.find((p) => p.id === payerId);
      if (payer) {
        onSelectPayer(payer);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">Pagador:</h3>
        <select
          value={selectedPayerId || ''}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">Selecione ou preencha manualmente...</option>
          {payers.map((payer) => (
            <option key={payer.id} value={payer.id}>
              {payer.nome} - {payer.cpfCnpj}
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
