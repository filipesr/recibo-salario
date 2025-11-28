'use client';

import { useRef } from 'react';
import { SavedReceipt, TemplateType } from '@/app/types/receipt';

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

  const handleExportCSV = () => {
    // Create SavedReceipt object
    const receipt: SavedReceipt = {
      numero: formData.numero || '',
      data: formData.data || '',
      valor: formData.valor || '',
      valorExtenso: formData.valorExtenso || '',
      pagador: formData.pagador || '',
      pagadorCpfCnpj: formData.pagadorCpfCnpj || '',
      pagadorEndereco: formData.pagadorEndereco || '',
      pagadorTelefone: formData.pagadorTelefone || '',
      pagadorEmail: formData.pagadorEmail || '',
      referente: formData.referente || '',
      cidade: formData.cidade || '',
      emitenteNome: formData.emitenteNome || '',
      emitenteCpfCnpj: formData.emitenteCpfCnpj || '',
      emitenteEndereco: formData.emitenteEndereco || '',
      emitenteTelefone: formData.emitenteTelefone || '',
      emitenteEmail: formData.emitenteEmail || '',
      template: selectedTemplate,
    };

    // Convert to CSV
    const headers = Object.keys(receipt);
    const values = Object.values(receipt);
    const csvContent = [
      headers.join(','),
      values.map((v) => `"${v}"`).join(','),
    ].join('\n');

    // Create filename: recibo_NUMERO_DATA_NomeRecebedor_PAGADOR.csv
    const numero = sanitizeFilename(formData.numero || 'SEM_NUMERO');
    const data = sanitizeFilename(formData.data || '');
    const nomeRecebedor = sanitizeFilename(formData.emitenteNome || 'SEM_NOME');
    const pagador = sanitizeFilename(formData.pagador || 'SEM_PAGADOR');
    const filename = `recibo_${numero}_${data}_${nomeRecebedor}_${pagador}.csv`;

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target?.result as string;
      const lines = csvContent.split('\n');

      if (lines.length < 2) {
        alert('Arquivo CSV inválido');
        return;
      }

      const headers = lines[0].split(',');
      const values = lines[1].split(',').map((v) => v.replace(/^"|"$/g, ''));

      const data: Record<string, string> = {};
      let template: TemplateType = 'classic';

      headers.forEach((header, index) => {
        const key = header.trim();
        const value = values[index]?.trim() || '';

        if (key === 'template') {
          template = value as TemplateType;
        } else {
          data[key] = value;
        }
      });

      // Load the receipt
      onLoadReceipt(data, template);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      alert('Recibo carregado com sucesso!');
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">Backup:</h3>
        <div className="flex gap-2 flex-1">
          <button
            onClick={handleExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
          >
            💾 Salvar CSV
          </button>
          <label className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition cursor-pointer">
            📂 Carregar CSV
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
