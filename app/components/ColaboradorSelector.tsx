'use client';

import { Colaborador } from '@/app/types/receipt';

interface ColaboradorSelectorProps {
  colaboradores: Colaborador[];
  selectedColaboradorId: string | null;
  onSelectColaborador: (colaborador: Colaborador | null) => void;
  onOpenModal: () => void;
}

export default function ColaboradorSelector({
  colaboradores,
  selectedColaboradorId,
  onSelectColaborador,
  onOpenModal,
}: ColaboradorSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colaboradorId = e.target.value;
    if (colaboradorId === '') {
      onSelectColaborador(null);
    } else {
      const colaborador = colaboradores.find((c) => c.id === colaboradorId);
      if (colaborador) {
        onSelectColaborador(colaborador);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">Colaborador:</h3>
        <select
          value={selectedColaboradorId || ''}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">Selecione ou preencha manualmente...</option>
          {colaboradores.map((colaborador) => (
            <option key={colaborador.id} value={colaborador.id}>
              {colaborador.nome} - {colaborador.cpfCnpj}
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
