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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Selecionar Pagador</h2>
      <div className="flex gap-3">
        <div className="flex-1">
          <select
            value={selectedPayerId || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          >
            <option value="">Selecione um pagador...</option>
            {payers.map((payer) => (
              <option key={payer.id} value={payer.id}>
                {payer.nome} - {payer.cpfCnpj}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition whitespace-nowrap"
        >
          Gerenciar Pagadores
        </button>
      </div>
      {selectedPayerId && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            ✓ Pagador selecionado. Os dados foram preenchidos automaticamente no formulário.
          </p>
        </div>
      )}
    </div>
  );
}
