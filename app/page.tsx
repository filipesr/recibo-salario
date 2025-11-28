'use client';

import { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import ClassicTemplate from './components/templates/ClassicTemplate';
import TwoColumnTemplate from './components/templates/TwoColumnTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import FormalTemplate from './components/templates/FormalTemplate';
import {
  TemplateType,
  ClassicReceiptData,
  TwoColumnReceiptData,
  ModernReceiptData,
  FormalReceiptData,
  FieldConfig,
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
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');
  const [formData, setFormData] = useState<Record<string, string>>({
    data: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template);
    // Reset form data quando mudar de template, mantendo apenas data
    setFormData({ data: new Date().toISOString().split('T')[0] });
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={formData as ClassicReceiptData} />;
      case 'two-column':
        return <TwoColumnTemplate data={formData as TwoColumnReceiptData} />;
      case 'modern':
        return <ModernTemplate data={formData as ModernReceiptData} />;
      case 'formal':
        return <FormalTemplate data={formData as FormalReceiptData} />;
    }
  };

  const currentFields = templateFields[selectedTemplate];

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-8 no-print">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerador de Recibos</h1>
          <p className="text-gray-600">Crie recibos profissionais facilmente</p>
        </header>

        {/* Template Selector */}
        <div className="no-print">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateChange}
          />
        </div>

        {/* Form and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="no-print">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preencha os Dados</h2>
              <form className="space-y-4">
                {currentFields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
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
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </form>

              <button
                onClick={handlePrint}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg"
              >
                🖨️ Imprimir Recibo
              </button>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 no-print mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Preview</h2>
            </div>
            <div className="flex justify-center">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
