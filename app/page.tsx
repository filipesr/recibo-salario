'use client';

import { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import PayerSelector from './components/PayerSelector';
import PayerModal from './components/PayerModal';
import ReceiptHistory from './components/ReceiptHistory';
import ClassicTemplate from './components/templates/ClassicTemplate';
import TwoColumnTemplate from './components/templates/TwoColumnTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import FormalTemplate from './components/templates/FormalTemplate';
import { usePayers } from './hooks/usePayers';
import { useReceiptData } from './hooks/useReceiptData';
import {
  TemplateType,
  ClassicReceiptData,
  TwoColumnReceiptData,
  ModernReceiptData,
  FormalReceiptData,
  FieldConfig,
  Payer,
} from './types/receipt';

// Configuração de campos para cada template
const templateFields: Record<TemplateType, FieldConfig[]> = {
  classic: [
    { name: 'numero', label: 'Número do Recibo', type: 'text', required: true, placeholder: '001' },
    { name: 'valor', label: 'Valor (R$)', type: 'text', required: true, placeholder: '1.000,00' },
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
    { name: 'valor', label: 'Valor (R$)', type: 'text', required: true, placeholder: '1.000,00' },
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
    { name: 'valor', label: 'Valor (R$)', type: 'text', required: true, placeholder: '1.000,00' },
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
    { name: 'valor', label: 'Valor (R$)', type: 'text', required: true, placeholder: '1.000,00' },
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
    }
  };

  const currentFields = templateFields[selectedTemplate];

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Compacto */}
        <header className="text-center mb-6 no-print">
          <h1 className="text-3xl font-bold text-gray-900">Gerador de Recibos</h1>
        </header>

        {/* Configurações Compactas */}
        <div className="no-print space-y-0 mb-6">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateChange}
          />
          <PayerSelector
            payers={payers}
            selectedPayerId={selectedPayerId}
            onSelectPayer={handleSelectPayer}
            onOpenModal={() => setIsModalOpen(true)}
          />
          <ReceiptHistory
            formData={formData}
            selectedTemplate={selectedTemplate}
            onLoadReceipt={handleLoadReceipt}
          />
        </div>

        {/* Formulário de Dados */}
        <div className="no-print">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Dados do Recibo</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleNewReceipt}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
                >
                  🗑️ Novo
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
                >
                  🖨️ Imprimir
                </button>
              </div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === 'textarea' ? 'md:col-span-2 lg:col-span-3' : ''}
                >
                  <label htmlFor={field.name} className="block text-xs font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || field.defaultValue || ''}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Preview no Final */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-4 no-print mb-4">
            <h2 className="text-lg font-bold text-gray-900">Preview do Recibo</h2>
          </div>
          <div className="flex justify-center">
            {renderTemplate()}
          </div>
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
