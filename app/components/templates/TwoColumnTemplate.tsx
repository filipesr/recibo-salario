import { TemplateProps, TwoColumnReceiptData } from '@/app/types/receipt';

export default function TwoColumnTemplate({ data }: TemplateProps<TwoColumnReceiptData>) {
  return (
    <div className="w-full max-w-5xl bg-sky-50 p-6 print-full-width">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2.5fr] gap-6">
        {/* Coluna Esquerda - Canhoto */}
        <div className="bg-white border-2 border-cyan-400 rounded-lg p-4 space-y-4 text-sm">
          <div>
            <label className="text-cyan-600 font-semibold text-xs">Recibo Nº</label>
            <div className="border-b border-cyan-300 py-1">
              {data.numero || '______'}
            </div>
          </div>

          <div>
            <label className="text-cyan-600 font-semibold text-xs">Valor</label>
            <div className="border-b border-cyan-300 py-1">
              R$ {data.valor || '_____'}
            </div>
          </div>

          <div>
            <label className="text-cyan-600 font-semibold text-xs">Recebi (emos) de</label>
            <div className="border-b border-cyan-300 py-1 min-h-[24px]">
              {data.pagador || '______'}
            </div>
          </div>

          <div>
            <label className="text-cyan-600 font-semibold text-xs">Endereço</label>
            <div className="border-b border-cyan-300 py-1 min-h-[40px] text-xs">
              {data.pagadorEndereco || '______'}
            </div>
          </div>

          <div>
            <label className="text-cyan-600 font-semibold text-xs">A importância de</label>
            <div className="border-b border-cyan-300 py-1 min-h-[60px] text-xs">
              {data.valorExtenso || '______'}
            </div>
          </div>

          <div>
            <label className="text-cyan-600 font-semibold text-xs">Referente</label>
            <div className="border-b border-cyan-300 py-1 min-h-[40px] text-xs">
              {data.referente || '______'}
            </div>
          </div>

          <div className="pt-4">
            <div className="border-b border-cyan-300 py-1 text-xs text-center">
              {data.cidade || '_____'}, {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}
            </div>
          </div>
        </div>

        {/* Coluna Direita - Recibo Principal */}
        <div className="bg-white border-2 border-cyan-400 rounded-lg p-6">
          {/* Cabeçalho */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-6">
              <div className="border border-cyan-400 rounded px-3 py-1">
                <label className="text-cyan-600 font-semibold text-xs">Nº</label>
                <div className="text-center font-bold">{data.numero || '___'}</div>
              </div>
              <h1 className="text-5xl font-bold text-cyan-500 tracking-wider">RECIBO</h1>
            </div>
            <div className="border border-cyan-400 rounded px-4 py-2">
              <label className="text-cyan-600 font-semibold text-xs block">Valor</label>
              <div className="text-xl font-bold">R$ {data.valor || '_____'}</div>
            </div>
          </div>

          {/* Corpo */}
          <div className="border-2 border-cyan-400 rounded-lg p-4 space-y-3 mb-4">
            <div>
              <label className="text-cyan-600 font-semibold">Recebi (emos) de</label>
              <div className="border-b-2 border-cyan-300 py-1">
                {data.pagador || '___________________________________________________'}
              </div>
            </div>

            <div>
              <label className="text-cyan-600 font-semibold">Endereço</label>
              <div className="border-b-2 border-cyan-300 py-1">
                {data.pagadorEndereco || '___________________________________________________'}
              </div>
            </div>

            <div>
              <label className="text-cyan-600 font-semibold">A importância de</label>
              <div className="border-b-2 border-cyan-300 py-2 min-h-[60px]">
                {data.valorExtenso || '___________________________________________________'}
              </div>
            </div>

            <div>
              <label className="text-cyan-600 font-semibold">Referente</label>
              <div className="border-b-2 border-cyan-300 py-2 min-h-[60px]">
                {data.referente || '___________________________________________________'}
              </div>
            </div>
          </div>

          {/* Texto Legal */}
          <p className="text-sm text-cyan-700 mb-6 text-center">
            Para maior clareza firm{data.emitenteNome ? 'o' : '___'} o presente.
          </p>

          {/* Local e Data */}
          <div className="border-2 border-cyan-400 rounded p-2 mb-4 text-center">
            <span className="text-cyan-700">
              {data.cidade || '________________'}, {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}
            </span>
          </div>

          {/* Emitente e Assinatura */}
          <div className="border-2 border-cyan-400 rounded p-3 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-cyan-600 font-semibold text-sm">Emitente</label>
                <div className="border-b border-cyan-300 py-1 text-sm">
                  {data.emitenteNome || '__________________'}
                </div>
              </div>
              <div>
                <label className="text-cyan-600 font-semibold text-sm">CPF/RG</label>
                <div className="border-b border-cyan-300 py-1 text-sm">
                  {data.emitenteCpfCnpj || '__________________'}
                </div>
              </div>
            </div>

            <div>
              <label className="text-cyan-600 font-semibold text-sm">Endereço</label>
              <div className="border-b border-cyan-300 py-1 text-sm">
                {data.emitenteEndereco || '___________________________________________________'}
              </div>
            </div>

            <div className="pt-4">
              <label className="text-cyan-600 font-semibold text-sm">Assinatura</label>
              <div className="border-b border-cyan-800 py-1 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
