'use client';

import { useRef } from 'react';
import { SavedReceipt, TemplateType, validateTemplate } from '@/app/types/receipt';

interface ReceiptHistoryProps {
  formData: Record<string, string>;
  selectedTemplate: TemplateType;
  onLoadReceipt: (data: Record<string, string>, template: TemplateType) => void;
}

export default function ReceiptHistory({
  formData,
  selectedTemplate,
  onLoadReceipt,
}: ReceiptHistoryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sanitize string for filename (remove special chars, limit length)
  const sanitizeFilename = (str: string): string => {
    return str
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 30);
  };

  const handleExportJSON = () => {
    // Create SavedReceipt object
    const receipt: SavedReceipt = {
      numero: formData.numero || '',
      data: formData.data || '',
      valor: formData.valor || '',
      valorExtenso: formData.valorExtenso || '',
      pagador: formData.pagador || '',
      pagadorCpfCnpj: formData.pagadorCpfCnpj || '',
      pagadorEndereco: formData.pagadorEndereco || '',
      pagadorComplemento: formData.pagadorComplemento || '',
      pagadorTelefone: formData.pagadorTelefone || '',
      referente: formData.referente || '',
      cidade: formData.cidade || '',
      colaboradorNome: formData.colaboradorNome || '',
      colaboradorCpfCnpj: formData.colaboradorCpfCnpj || '',
      colaboradorEmail: formData.colaboradorEmail || '',
      colaboradorCargo: formData.colaboradorCargo || '',
      template: selectedTemplate,
    };

    // Convert to JSON (formatted for readability)
    const jsonContent = JSON.stringify(receipt, null, 2);

    // Create filename: recibo_NUMERO_DATA_NomeRecebedor_PAGADOR.json
    const numero = sanitizeFilename(formData.numero || 'SEM_NUMERO');
    const data = sanitizeFilename(formData.data || '');
    const filename = `recibo_${numero}_${data}.json`;

    // Download file
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;

      try {
        let data: Record<string, string> = {};
        let template: TemplateType;

        // Try JSON first
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content) as SavedReceipt;
          template = validateTemplate(parsed.template);

          // Extract data (exclude template field)
          Object.keys(parsed).forEach((key) => {
            if (key !== 'template') {
              data[key] = String(parsed[key as keyof SavedReceipt] || '');
            }
          });
        }
        else {
          throw new Error('Formato de arquivo não suportado. Use .json');
        }

        // Load the receipt
        onLoadReceipt(data, template!);

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        alert('Recibo carregado com sucesso!');
      } catch (error) {
        console.error('Erro ao importar arquivo:', error);
        alert(`Erro ao carregar arquivo: ${error instanceof Error ? error.message : 'Formato inválido'}`);

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportJSON}
        className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
      >
        💾 Salvar
      </button>
      <label className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition cursor-pointer">
        📂 Carregar
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportFile}
          className="hidden"
        />
      </label>
    </div>
  );
}
