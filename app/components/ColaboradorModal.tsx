'use client';

import { useState } from 'react';
import { Colaborador } from '@/app/types/receipt';

interface ColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
  colaboradores: Colaborador[];
  onAddColaborador: (colaborador: Omit<Colaborador, 'id'>) => void;
  onUpdateColaborador: (id: string, colaborador: Partial<Omit<Colaborador, 'id'>>) => void;
  onDeleteColaborador: (id: string) => void;
}

export default function ColaboradorModal({
  isOpen,
  onClose,
  colaboradores,
  onAddColaborador,
  onUpdateColaborador,
  onDeleteColaborador,
}: ColaboradorModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Colaborador, 'id'>>({
    nome: '',
    cpfCnpj: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      onUpdateColaborador(editingId, formData);
      setEditingId(null);
    } else {
      onAddColaborador(formData);
      setIsAdding(false);
    }

    setFormData({
      nome: '',
      cpfCnpj: '',
    });
  };

  const handleEdit = (colaborador: Colaborador) => {
    setEditingId(colaborador.id);
    setIsAdding(true);
    setFormData({
      nome: colaborador.nome,
      cpfCnpj: colaborador.cpfCnpj,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      nome: '',
      cpfCnpj: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este colaborador?')) {
      onDeleteColaborador(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Colaboradores</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Add/Edit Form */}
          {isAdding ? (
            <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Editar Colaborador' : 'Adicionar Novo Colaborador'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CI/CPF <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              + Adicionar Colaborador
            </button>
          )}

          {/* Colaboradores List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Colaboradores Cadastrados</h3>
            {colaboradores.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum colaborador cadastrado ainda.</p>
            ) : (
              <div className="space-y-3">
                {colaboradores.map((colaborador) => (
                  <div
                    key={colaborador.id}
                    className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{colaborador.nome}</h4>
                        <div className="mt-2 text-sm text-gray-600">
                          <div><strong>CI/CPF:</strong> {colaborador.cpfCnpj}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(colaborador)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(colaborador.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
