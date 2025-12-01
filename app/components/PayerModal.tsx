'use client';

import { useState } from 'react';
import { Payer } from '@/app/types/receipt';

interface PayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  payers: Payer[];
  onAddPayer: (payer: Omit<Payer, 'id'>) => void;
  onUpdatePayer: (id: string, payer: Partial<Omit<Payer, 'id'>>) => void;
  onDeletePayer: (id: string) => void;
}

export default function PayerModal({
  isOpen,
  onClose,
  payers,
  onAddPayer,
  onUpdatePayer,
  onDeletePayer,
}: PayerModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Payer, 'id'>>({
    nome: '',
    cpfCnpj: '',
    endereco: '',
    complemento: '',
    telefone: '',
    email: '',
    responsavel: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      onUpdatePayer(editingId, formData);
      setEditingId(null);
    } else {
      onAddPayer(formData);
      setIsAdding(false);
    }

    setFormData({
      nome: '',
      cpfCnpj: '',
      endereco: '',
      complemento: '',
      telefone: '',
      email: '',
      responsavel: '',
    });
  };

  const handleEdit = (payer: Payer) => {
    setEditingId(payer.id);
    setIsAdding(true);
    setFormData({
      nome: payer.nome,
      cpfCnpj: payer.cpfCnpj,
      endereco: payer.endereco,
      complemento: payer.complemento || '',
      telefone: payer.telefone,
      email: payer.email,
      responsavel: payer.responsavel || '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      nome: '',
      cpfCnpj: '',
      endereco: '',
      complemento: '',
      telefone: '',
      email: '',
      responsavel: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este pagador?')) {
      onDeletePayer(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Pagadores</h2>
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
                {editingId ? 'Editar Pagador' : 'Adicionar Novo Pagador'}
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
                    CPF/CNPJ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    required
                    rows={2}
                    placeholder="Rua, número, bairro"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                    required
                    placeholder="Cidade, estado e país"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsável (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
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
              + Adicionar Pagador
            </button>
          )}

          {/* Payers List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pagadores Cadastrados</h3>
            {payers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum pagador cadastrado ainda.</p>
            ) : (
              <div className="space-y-3">
                {payers.map((payer) => (
                  <div
                    key={payer.id}
                    className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{payer.nome}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                          <div><strong>CPF/CNPJ:</strong> {payer.cpfCnpj}</div>
                          <div><strong>Telefone:</strong> {payer.telefone}</div>
                          <div><strong>Email:</strong> {payer.email}</div>
                          {payer.responsavel && (
                            <div><strong>Responsável:</strong> {payer.responsavel}</div>
                          )}
                          <div className="md:col-span-2"><strong>Endereço:</strong> {payer.endereco}</div>
                          {payer.complemento && (
                            <div className="md:col-span-2"><strong>Complemento:</strong> {payer.complemento}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(payer)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(payer.id)}
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
