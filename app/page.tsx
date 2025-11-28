'use client';

import { useState, useEffect } from 'react';
import PayerSelector from './components/PayerSelector';
import PayerModal from './components/PayerModal';
import ReceiptHistory from './components/ReceiptHistory';
import ClassicTemplate from './components/templates/ClassicTemplate';
import TwoColumnTemplate from './components/templates/TwoColumnTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import FormalTemplate from './components/templates/FormalTemplate';
import GoonTemplate from './components/templates/GoonTemplate';
import { usePayers } from './hooks/usePayers';
import { useReceiptData } from './hooks/useReceiptData';
import {
  TemplateType,
  ClassicReceiptData,
  TwoColumnReceiptData,
  ModernReceiptData,
  FormalReceiptData,
  GoonReceiptData,
  FieldConfig,
  Payer,
} from './types/receipt';

// Templates disponíveis
const templates = [
  {
    id: 'goon' as TemplateType,
    name: 'GoOn',
    description: 'Template profissional com branding GoOn',
    color: 'bg-red-50 border-red-600',
    icon: '📋',
  },
  {
    id: 'classic' as TemplateType,
    name: 'Clássico',
    description: 'Estilo tradicional amarelo com fonte de máquina de escrever',
    color: 'bg-yellow-50 border-yellow-400',
    icon: '📄',
  },
  {
    id: 'two-column' as TemplateType,
    name: 'Duas Colunas',
    description: 'Recibo azul com canhoto destacável',
    color: 'bg-sky-50 border-cyan-400',
    icon: '📋',
  },
  {
    id: 'modern' as TemplateType,
    name: 'Moderno',
    description: 'Design minimalista e contemporâneo',
    color: 'bg-white border-gray-300',
    icon: '✨',
  },
  {
    id: 'formal' as TemplateType,
    name: 'Formal',
    description: 'Layout corporativo e profissional',
    color: 'bg-slate-50 border-slate-400',
    icon: '🏢',
  },
];

// Configuração de campos para cada template
const templateFields: Record<TemplateType, FieldConfig[]> = {
  classic: [
    { name: 'numero', label: 'Número do Recibo', type: 'text', required: true, placeholder: '001' },
    { name: 'valor', label: 'Valor', type: 'text', required: true, placeholder: '1.000,00' },
    { name: 'pagador', label: 'Recebi(emos) de', type: 'text', required: true, placeholder: 'Nome do pagador' },
    { name: 'valorExtenso', label: 'Valor por extenso', type: 'text', required: true, placeholder: 'Mil reais' },
    { name: 'referente', label: 'Referente a', type: 'textarea', required: true, placeholder: 'Descrição do serviço ou produto' },
    { name: 'cidade', label: 'Cidade', type: 'text', required: true, placeholder: 'São Paulo' },
    { name: 'data', label: 'Data', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    { name: 'emitenteNome', label: 'Nome do Emitente', type: 'text', required: true, placeholder: 'Seu nome' },
    { name: 'emitenteCpfCnpj', label: 'CPF/CNPJ do Emitente', type: 'text', required: true, placeholder: '000.000.000-00' },
    { name: 'emitenteTelefone', label: 'Telefone do Emitente', type: 'tel', required: true, placeholder: '(11) 99999-9999' },
  ],
  'two-column': [
    { name: 'numero', label: 'Número do Recibo', type: 'text', required: true, placeholder: '001' },
    { name: 'valor', label: 'Valor', type: 'text', required: true, placeholder: '1.000,00' },
    { name: 'pagador', label: 'Recebi(emos) de', type: 'text', required: true, placeholder: 'Nome do pagador' },
    { name: 'pagadorEndereco', label: 'Endereço do Pagador', type: 'textarea', required: true, placeholder: 'Rua, número, bairro, cidade - UF' },
    { name: 'pagadorTelefone', label: 'Telefone do Pagador', type: 'tel', required: false, placeholder: '(11) 99999-9999' },
    { name: 'pagadorEmail', label: 'Email do Pagador', type: 'text', required: false, placeholder: 'email@exemplo.com' },
    { name: 'valorExtenso', label: 'Valor por extenso', type: 'text', required: true, placeholder: 'Mil reais' },
    { name: 'referente', label: 'Referente a', type: 'textarea', required: true, placeholder: 'Descrição do serviço ou produto' },
    { name: 'cidade', label: 'Cidade', type: 'text', required: true, placeholder: 'São Paulo' },
    { name: 'data', label: 'Data', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    { name: 'emitenteNome', label: 'Nome do Emitente', type: 'text', required: true, placeholder: 'Seu nome' },
    { name: 'emitenteCpfCnpj', label: 'CPF/CNPJ do Emitente', type: 'text', required: true, placeholder: '000.000.000-00' },
    { name: 'emitenteEndereco', label: 'Endereço do Emitente', type: 'textarea', required: true, placeholder: 'Rua, número, bairro, cidade - UF' },
    { name: 'emitenteTelefone', label: 'Telefone do Emitente', type: 'tel', required: true, placeholder: '(11) 99999-9999' },
  ],
  modern: [
    { name: 'numero', label: 'Número do Recibo', type: 'text', required: true, placeholder: '001' },
    { name: 'valor', label: 'Valor', type: 'text', required: true, placeholder: '1.000,00' },
    { name: 'pagador', label: 'Recebido de', type: 'text', required: true, placeholder: 'Nome do pagador' },
    { name: 'valorExtenso', label: 'Valor por extenso', type: 'text', required: true, placeholder: 'Mil reais' },
    { name: 'referente', label: 'Referente a', type: 'textarea', required: true, placeholder: 'Descrição do serviço ou produto' },
    { name: 'cidade', label: 'Cidade', type: 'text', required: true, placeholder: 'São Paulo' },
    { name: 'data', label: 'Data', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    { name: 'emitenteNome', label: 'Nome do Emitente', type: 'text', required: true, placeholder: 'Seu nome' },
    { name: 'emitenteCpfCnpj', label: 'CPF/CNPJ do Emitente', type: 'text', required: true, placeholder: '000.000.000-00' },
    { name: 'emitenteTelefone', label: 'Telefone do Emitente', type: 'tel', required: true, placeholder: '(11) 99999-9999' },
    { name: 'emitenteEmail', label: 'Email do Emitente (opcional)', type: 'text', required: false, placeholder: 'email@exemplo.com' },
  ],
  formal: [
    { name: 'numero', label: 'Número do Documento', type: 'text', required: true, placeholder: '001' },
    { name: 'valor', label: 'Valor', type: 'text', required: true, placeholder: '1.000,00' },
    { name: 'pagador', label: 'Nome do Pagador', type: 'text', required: true, placeholder: 'Nome ou razão social' },
    { name: 'pagadorCpfCnpj', label: 'CPF/CNPJ do Pagador', type: 'text', required: true, placeholder: '000.000.000-00' },
    { name: 'pagadorEndereco', label: 'Endereço do Pagador', type: 'textarea', required: true, placeholder: 'Rua, número, bairro, cidade - UF, CEP' },
    { name: 'pagadorTelefone', label: 'Telefone do Pagador', type: 'tel', required: false, placeholder: '(11) 99999-9999' },
    { name: 'pagadorEmail', label: 'Email do Pagador', type: 'text', required: false, placeholder: 'email@exemplo.com' },
    { name: 'valorExtenso', label: 'Valor por extenso', type: 'text', required: true, placeholder: 'Mil reais' },
    { name: 'referente', label: 'Referente a', type: 'textarea', required: true, placeholder: 'Descrição detalhada do serviço ou produto' },
    { name: 'cidade', label: 'Cidade', type: 'text', required: true, placeholder: 'São Paulo' },
    { name: 'data', label: 'Data de Emissão', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    { name: 'emitenteNome', label: 'Nome do Emitente', type: 'text', required: true, placeholder: 'Nome ou razão social' },
    { name: 'emitenteCpfCnpj', label: 'CPF/CNPJ do Emitente', type: 'text', required: true, placeholder: '000.000.000-00' },
    { name: 'emitenteEndereco', label: 'Endereço do Emitente', type: 'textarea', required: true, placeholder: 'Rua, número, bairro, cidade - UF, CEP' },
    { name: 'emitenteTelefone', label: 'Telefone do Emitente', type: 'tel', required: true, placeholder: '(11) 99999-9999' },
    { name: 'emitenteEmail', label: 'Email do Emitente', type: 'text', required: true, placeholder: 'contato@empresa.com' },
  ],
  goon: [
    { name: 'numero', label: 'Número do Recibo', type: 'text', required: true, placeholder: '0000951' },
    { name: 'moeda', label: 'Moeda', type: 'text', required: true, placeholder: 'R$', defaultValue: 'R$' },
    { name: 'data', label: 'Data de Emissão', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    { name: 'pagador', label: 'Recibí(mos) de', type: 'text', required: true, placeholder: 'Nome do pagador' },
    { name: 'pagadorCpfCnpj', label: 'RUC/CPF/CNPJ', type: 'text', required: true, placeholder: '000.000.000-00' },
    { name: 'pagadorEndereco', label: 'Endereço do Pagador', type: 'textarea', required: true, placeholder: 'Endereço completo do pagador' },
    { name: 'pagadorTelefone', label: 'Telefone do Pagador', type: 'tel', required: true, placeholder: '(0991) 501 572' },
    { name: 'valor', label: 'Valor', type: 'text', required: true, placeholder: '1.000,00' },
    { name: 'valorExtenso', label: 'Valor por extenso', type: 'text', required: true, placeholder: 'Mil reais' },
    { name: 'referente', label: 'En concepto de', type: 'textarea', required: true, placeholder: 'Descrição do serviço ou produto' },
    { name: 'cidade', label: 'Cidade', type: 'text', required: true, placeholder: 'Ciudad del Este' },
    { name: 'emitenteNome', label: 'Nome da Empresa', type: 'text', required: true, placeholder: 'GoOn Marketing & Eventos' },
    { name: 'emitenteCargo', label: 'Atividade', type: 'text', required: true, placeholder: 'Actividades Publicitarias' },
    { name: 'emitenteEndereco', label: 'Endereço Completo', type: 'textarea', required: true, placeholder: 'Endereço completo da empresa' },
    { name: 'emitenteCpfCnpj', label: 'CPF/CNPJ', type: 'text', required: true, placeholder: '00.000.000/0000-00' },
    { name: 'emitenteTelefone', label: 'Telefone', type: 'tel', required: true, placeholder: '(0991) 501 572' },
  ],
};

export default function Home() {
  const { payers, addPayer, updatePayer, deletePayer } = usePayers();
  const {
    formData,
    setFormData,
    selectedTemplate,
    updateField,
    updateFields,
    clearReceipt,
    changeTemplate,
  } = useReceiptData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayerId, setSelectedPayerId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch ao carregar dados do localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleTemplateChange = (template: TemplateType) => {
    changeTemplate(template);
  };

  const handleSelectPayer = (payer: Payer | null) => {
    if (payer) {
      setSelectedPayerId(payer.id);
      // Update form fields with payer data
      updateFields({
        pagador: payer.nome,
        pagadorCpfCnpj: payer.cpfCnpj,
        pagadorEndereco: payer.endereco,
        pagadorTelefone: payer.telefone,
        pagadorEmail: payer.email,
      });
    } else {
      setSelectedPayerId(null);
    }
  };

  const handleLoadReceipt = (data: Record<string, string>, template: TemplateType) => {
    setFormData(data);
    changeTemplate(template);
  };

  const handleNewReceipt = () => {
    if (confirm('Deseja limpar todos os campos e começar um novo recibo?')) {
      clearReceipt();
      setSelectedPayerId(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={formData as unknown as ClassicReceiptData} />;
      case 'two-column':
        return <TwoColumnTemplate data={formData as unknown as TwoColumnReceiptData} />;
      case 'modern':
        return <ModernTemplate data={formData as unknown as ModernReceiptData} />;
      case 'formal':
        return <FormalTemplate data={formData as unknown as FormalReceiptData} />;
      case 'goon':
        return <GoonTemplate data={formData as unknown as GoonReceiptData} />;
    }
  };

  const currentFields = templateFields[selectedTemplate];

  // Evita hydration mismatch - não renderiza até montar no cliente
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Gerador de Recibos</h1>
          </header>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Carregando...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Compacto */}
        <header className="text-center mb-6 no-print">
          <h1 className="text-3xl font-bold text-gray-900">Gerador de Recibos</h1>
        </header>

        {/* Seletor de Pagador */}
        <div className="no-print mb-6">
          <PayerSelector
            payers={payers}
            selectedPayerId={selectedPayerId}
            onSelectPayer={handleSelectPayer}
            onOpenModal={() => setIsModalOpen(true)}
          />
        </div>

        {/* Formulário de Dados */}
        <div className="no-print">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Dados do Recibo</h2>
              <ReceiptHistory
                formData={formData}
                selectedTemplate={selectedTemplate}
                onLoadReceipt={handleLoadReceipt}
              />
              <button
                onClick={handleNewReceipt}
                className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
              >
                Limpar
              </button>
            </div>

            {/* Layout Customizado de Inputs */}
            <form className="space-y-4">
              {/* Linha 1: Número - Valor - Valor por extenso */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="numero" className="block text-xs font-medium text-gray-700 mb-1">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="numero"
                    type="text"
                    name="numero"
                    value={formData.numero || ''}
                    onChange={handleInputChange}
                    placeholder="001"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="valor" className="block text-xs font-medium text-gray-700 mb-1">
                    Valor <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="valor"
                    type="text"
                    name="valor"
                    value={formData.valor || ''}
                    onChange={handleInputChange}
                    placeholder="1.000,00"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="valorExtenso" className="block text-xs font-medium text-gray-700 mb-1">
                    Valor por extenso <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="valorExtenso"
                    type="text"
                    name="valorExtenso"
                    value={formData.valorExtenso || ''}
                    onChange={handleInputChange}
                    placeholder="Mil reais"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Linha 2: Referente a */}
              <div>
                <label htmlFor="referente" className="block text-xs font-medium text-gray-700 mb-1">
                  Referente a <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="referente"
                  name="referente"
                  value={formData.referente || ''}
                  onChange={handleInputChange}
                  placeholder="Descrição do serviço ou produto"
                  required
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Linha 3: Recebi de - Telefone - Email - Endereço (Pagador) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="pagador" className="block text-xs font-medium text-gray-700 mb-1">
                    Recebi de <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pagador"
                    type="text"
                    name="pagador"
                    value={formData.pagador || ''}
                    onChange={handleInputChange}
                    placeholder="Nome do pagador"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="pagadorTelefone" className="block text-xs font-medium text-gray-700 mb-1">
                    Telefone Pagador
                  </label>
                  <input
                    id="pagadorTelefone"
                    type="tel"
                    name="pagadorTelefone"
                    value={formData.pagadorTelefone || ''}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="pagadorEmail" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Pagador
                  </label>
                  <input
                    id="pagadorEmail"
                    type="email"
                    name="pagadorEmail"
                    value={formData.pagadorEmail || ''}
                    onChange={handleInputChange}
                    placeholder="email@exemplo.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="pagadorEndereco" className="block text-xs font-medium text-gray-700 mb-1">
                    Endereço Pagador
                  </label>
                  <input
                    id="pagadorEndereco"
                    type="text"
                    name="pagadorEndereco"
                    value={formData.pagadorEndereco || ''}
                    onChange={handleInputChange}
                    placeholder="Rua, número, cidade"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Linha 4: Nome Emitente - Doc - Telefone - Endereço */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="emitenteNome" className="block text-xs font-medium text-gray-700 mb-1">
                    Nome Emitente <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emitenteNome"
                    type="text"
                    name="emitenteNome"
                    value={formData.emitenteNome || ''}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="emitenteCpfCnpj" className="block text-xs font-medium text-gray-700 mb-1">
                    CPF/CNPJ Emitente <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emitenteCpfCnpj"
                    type="text"
                    name="emitenteCpfCnpj"
                    value={formData.emitenteCpfCnpj || ''}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="emitenteTelefone" className="block text-xs font-medium text-gray-700 mb-1">
                    Telefone Emitente <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emitenteTelefone"
                    type="tel"
                    name="emitenteTelefone"
                    value={formData.emitenteTelefone || ''}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="emitenteEndereco" className="block text-xs font-medium text-gray-700 mb-1">
                    Endereço Emitente
                  </label>
                  <input
                    id="emitenteEndereco"
                    type="text"
                    name="emitenteEndereco"
                    value={formData.emitenteEndereco || ''}
                    onChange={handleInputChange}
                    placeholder="Rua, número, cidade"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Linha 5: Cidade - Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cidade" className="block text-xs font-medium text-gray-700 mb-1">
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cidade"
                    type="text"
                    name="cidade"
                    value={formData.cidade || ''}
                    onChange={handleInputChange}
                    placeholder="São Paulo"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="data" className="block text-xs font-medium text-gray-700 mb-1">
                    Data <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="data"
                    type="date"
                    name="data"
                    value={formData.data || new Date().toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Card de Controles (não imprime) */}
        <div className="no-print mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header: Título - Modelos - Imprimir */}
            <div className="flex items-center justify-between gap-6">
              {/* Esquerda: Título */}
              <div className="flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Preview do Recibo</h2>
              </div>

              {/* Centro: Seletor de Modelos */}
              <div className="flex-grow">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">Modelo:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateChange(template.id)}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm
                          ${template.color}
                          ${
                            selectedTemplate === template.id
                              ? 'border-blue-500 ring-2 ring-blue-200 font-semibold'
                              : 'hover:border-gray-400'
                          }
                        `}
                        title={template.description}
                      >
                        <span className="text-lg">{template.icon}</span>
                        <span>{template.name}</span>
                        {selectedTemplate === template.id && (
                          <span className="text-blue-500 font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direita: Botão Imprimir */}
              <div className="flex-shrink-0">
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition whitespace-nowrap"
                >
                  🖨️ Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview do Recibo (imprime) */}
        <div className="flex justify-center">
          {renderTemplate()}
        </div>
      </div>

      {/* Payer Modal */}
      <PayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payers={payers}
        onAddPayer={addPayer}
        onUpdatePayer={updatePayer}
        onDeletePayer={deletePayer}
      />
    </main>
  );
}
