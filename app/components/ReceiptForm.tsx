'use client';

import { useState } from 'react';

export default function ReceiptForm() {
  const [formData, setFormData] = useState({
    numero: '',
    valor: '',
    pagador: '', // Recebi(emos) de
    valorExtenso: '', // A quantia de
    referente: '', // Referente a
    cidade: '',
    data: new Date().toISOString().split('T')[0], // Default para hoje
    emitenteNome: '',
    emitenteCpfCnpj: '',
    emitenteTelefone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do Recibo:', formData);
    alert('Recibo gerado! (Verifique o console)');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-start">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-3xl bg-yellow-50 border-2 border-gray-400 p-6 shadow-lg rounded-sm relative"
        style={{ fontFamily: 'Courier New, Courier, monospace' }} // Fonte estilo máquina de escrever/documento
      >
        
        {/* Cabeçalho: Título, Número e Valor */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-800">Recibo</h1>
            <div className="flex items-center gap-2">
              <label htmlFor="numero" className="font-bold text-gray-700">Nº</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="w-24 p-1 bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="001"
              />
            </div>
          </div>

          <div className="bg-white border-2 border-gray-800 p-2 rounded flex items-center shadow-inner">
            <span className="text-xl font-bold mr-2 text-gray-700">R$</span>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              className="text-2xl font-bold w-40 text-right focus:outline-none"
              placeholder="0,00"
              step="0.01"
            />
          </div>
        </div>

        {/* Corpo do Recibo */}
        <div className="space-y-6 text-lg text-gray-800">
          
          {/* Recebi de */}
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <span className="whitespace-nowrap font-bold">Recebi(emos) de:</span>
            <input
              type="text"
              name="pagador"
              value={formData.pagador}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 p-1"
              placeholder="Nome do pagador"
            />
          </div>

          {/* A quantia de */}
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <span className="whitespace-nowrap font-bold">A quantia de:</span>
            <input
              type="text"
              name="valorExtenso"
              value={formData.valorExtenso}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 p-1"
              placeholder="Valor por extenso (ex: Quinhentos Reais)"
            />
          </div>

          {/* Referente a */}
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <span className="whitespace-nowrap font-bold">Referente a:</span>
            <input
              type="text"
              name="referente"
              value={formData.referente}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 p-1"
              placeholder="Descrição do serviço ou produto"
            />
          </div>

          {/* Texto Legal */}
          <p className="text-sm text-gray-600 mt-4 text-justify italic">
            Para maior clareza firmo(amos) o presente recibo para que produza os seus efeitos, dando plena, rasa e irrevogável quitação pelo valor recebido.
          </p>

          {/* Local e Data */}
          <div className="flex flex-col md:flex-row justify-end items-end gap-2 mt-8">
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="w-40 bg-transparent border-b border-gray-400 text-center focus:outline-none"
              placeholder="Cidade"
            />
            <span>,</span>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Rodapé / Assinatura */}
        <div className="mt-12 pt-4 border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Dados do Emitente (Opcional, mas comum em recibos digitais) */}
          <div className="text-sm space-y-2">
            <h3 className="font-bold text-gray-700 uppercase mb-2">Dados do Emitente</h3>
            <div>
              <label className="block text-xs text-gray-500">Nome:</label>
              <input 
                type="text" 
                name="emitenteNome" 
                value={formData.emitenteNome}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent focus:outline-none" 
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500">CPF/CNPJ:</label>
                <input 
                  type="text" 
                  name="emitenteCpfCnpj" 
                  value={formData.emitenteCpfCnpj}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 bg-transparent focus:outline-none" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Telefone:</label>
                <input 
                  type="text" 
                  name="emitenteTelefone" 
                  value={formData.emitenteTelefone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 bg-transparent focus:outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Área de Assinatura Visual */}
          <div className="flex flex-col justify-end items-center">
            <div className="w-full border-b border-gray-800 mb-2"></div>
            <span className="text-sm font-bold text-gray-600 uppercase">Assinatura do Emitente</span>
          </div>
        </div>

        {/* Botão de Ação (Não sai na impressão se usar @media print) */}
        <div className="mt-8 text-center print:hidden">
            <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded shadow transition duration-200"
            >
                Gerar Recibo / Salvar
            </button>
        </div>

      </form>
    </div>
  );
}