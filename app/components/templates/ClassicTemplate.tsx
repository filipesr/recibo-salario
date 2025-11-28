import { TemplateProps, ClassicReceiptData } from '@/app/types/receipt';

export default function ClassicTemplate({ data }: TemplateProps<ClassicReceiptData>) {
  return (
    <div
      className="w-full max-w-3xl bg-yellow-50 border-2 border-gray-400 p-6 shadow-lg rounded-sm print-full-width"
      style={{ fontFamily: 'Courier New, Courier, monospace' }}
    >
      {/* Cabeçalho: Título, Número e Valor */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-800">Recibo</h1>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">Nº</span>
            <span className="font-bold text-gray-900">{data.numero || '___'}</span>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-800 p-2 rounded flex items-center shadow-inner">
          <span className="text-2xl font-bold">{data.valor || '0,00'}</span>
        </div>
      </div>

      {/* Corpo do Recibo */}
      <div className="space-y-6 text-lg text-gray-800">
        {/* Recebi de */}
        <div className="flex flex-col md:flex-row md:items-end gap-2">
          <span className="whitespace-nowrap font-bold">Recebi(emos) de:</span>
          <span className="w-full border-b border-gray-400 p-1">
            {data.pagador || '_____________________'}
          </span>
        </div>

        {/* A quantia de */}
        <div className="flex flex-col md:flex-row md:items-end gap-2">
          <span className="whitespace-nowrap font-bold">A quantia de:</span>
          <span className="w-full border-b border-gray-400 p-1">
            {data.valorExtenso || '_____________________'}
          </span>
        </div>

        {/* Referente a */}
        <div className="flex flex-col md:flex-row md:items-end gap-2">
          <span className="whitespace-nowrap font-bold">Referente a:</span>
          <span className="w-full border-b border-gray-400 p-1">
            {data.referente || '_____________________'}
          </span>
        </div>

        {/* Texto Legal */}
        <p className="text-sm text-gray-600 mt-4 text-justify italic">
          Para maior clareza firmo(amos) o presente recibo para que produza os seus efeitos, dando plena, rasa e irrevogável quitação pelo valor recebido.
        </p>

        {/* Local e Data */}
        <div className="flex flex-col md:flex-row justify-end items-end gap-2 mt-8">
          <span>{data.cidade || '_______'}</span>
          <span>,</span>
          <span>{data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}</span>
        </div>
      </div>

      {/* Rodapé / Assinatura */}
      <div className="mt-12 pt-4 border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dados do Emitente */}
        <div className="text-sm space-y-2">
          <h3 className="font-bold text-gray-700 uppercase mb-2">Dados do Emitente</h3>
          <div>
            <label className="block text-xs text-gray-500">Nome:</label>
            <span className="block border-b border-gray-300">{data.emitenteNome || '_______________'}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500">CPF/CNPJ:</label>
              <span className="block border-b border-gray-300">{data.emitenteCpfCnpj || '_______________'}</span>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500">Telefone:</label>
              <span className="block border-b border-gray-300">{data.emitenteTelefone || '_______________'}</span>
            </div>
          </div>
        </div>

        {/* Área de Assinatura Visual */}
        <div className="flex flex-col justify-end items-center">
          <div className="w-full border-b border-gray-800 mb-2 h-16"></div>
          <span className="text-sm font-bold text-gray-600 uppercase">Assinatura do Emitente</span>
        </div>
      </div>
    </div>
  );
}
