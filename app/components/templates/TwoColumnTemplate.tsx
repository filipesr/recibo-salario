import { TemplateProps, TwoColumnReceiptData } from '@/app/types/receipt';

export default function TwoColumnTemplate({ data }: TemplateProps<TwoColumnReceiptData>) {
  return (
    <div className="w-full max-w-5xl bg-sky-50 p-6 print-full-width">
      <div className="grid grid-cols-[1fr,2fr] gap-4 print:grid-cols-[1fr,2fr]">
        {/* Coluna Esquerda - Canhoto */}
        <div className="flex flex-col bg-white border-2 border-cyan-400 rounded-lg p-3 space-y-2 text-sm">
          <div className="text-xs">
            <span className="text-cyan-600 font-semibold">Recibo Nº: </span>
            <span className="">{data.numero || '______'}</span>
          </div>

          <div className="text-xs">
            <span className="text-cyan-600 font-semibold">Valor: </span>
            <span className="">{data.valor || '_____'}</span>
          </div>

          <div className="text-xs">
            <span className="text-cyan-600 font-semibold">Recebi de: </span>
            <span className="">{data.pagador || '______'}</span>
          </div>

          <div className="text-xs">
            <span className="text-cyan-600 font-semibold">Endereço: </span>
            <span className="">{data.pagadorEndereco || '______'}</span>
          </div>

          <div className="text-xs">
            <span className="text-cyan-600 font-semibold">A importância de: </span>
            <span className="">{data.valorExtenso || '______'}</span>
          </div>

          <div className="text-xs">
            <span className="text-cyan-600 font-semibold">Referente: </span>
            <span className="">{data.referente || '______'}</span>
          </div>

          <div className='flex-1' />

          <div className="pt-2">
            <div className="py-0.5 text-xs text-center">
              {data.cidade || '_____'}, {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}
            </div>
          </div>
        </div>

        {/* Coluna Direita - Recibo Principal */}
        <div className="bg-white border-2 border-cyan-400 rounded-lg p-4">
          {/* Cabeçalho com grid para colocar conteúdo ao lado */}
          <div className="grid grid-cols-[auto,1fr,auto] gap-3 items-start mb-3">
            <div className="border border-cyan-400 rounded px-2 py-1 flex justify-center gap-1">
              <span className="text-cyan-600 font-semibold text-xs ">Nº: </span>
              <span className="font-bold text-sm">{data.numero || '___'}</span>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-cyan-500 tracking-wider text-center">RECIBO</h1>
            </div>
            <div className="border border-cyan-400 rounded px-2 py-1 flex justify-center gap-1">
              <span className="text-cyan-600 font-semibold text-xs">Valor: </span>
              <span className="text-lg font-bold">{data.valor || '_____'}</span>
            </div>
          </div>

          {/* Corpo - Começando logo após o título */}
          <div className="border-2 border-cyan-400 rounded-lg p-3 space-y-1.5 mb-2">
            <div className="text-sm">
              <span className="text-cyan-600 font-semibold">Recebi de: </span>
              <span className="border-b border-cyan-300">{data.pagador || '___________________________'}</span>
            </div>

            <div className="text-sm">
              <span className="text-cyan-600 font-semibold">Endereço: </span>
              <span className="border-b border-cyan-300">{data.pagadorEndereco || '___________________________'}</span>
            </div>

            <div className="text-sm">
              <span className="text-cyan-600 font-semibold">A importância de: </span>
              <span className="border-b border-cyan-300">{data.valorExtenso || '___________________________'}</span>
            </div>

            <div className="text-sm">
              <span className="text-cyan-600 font-semibold">Referente: </span>
              <span className="border-b border-cyan-300">{data.referente || '___________________________'}</span>
            </div>
          </div>

          {/* Texto Legal */}
          <p className="text-xs text-cyan-700 mb-2 text-center leading-tight">
            Para maior clareza firm{data.colaboradorNome ? 'o' : '___'} o presente.
          </p>

          {/* Local e Data */}
          <div className="border border-cyan-400 rounded p-1.5 mb-2 text-center">
            <span className="text-cyan-700 text-sm">
              {data.cidade || '________'}, {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}
            </span>
          </div>

          {/* Colaborador e Assinatura */}
          <div className="border-2 border-cyan-400 rounded p-2 space-y-1.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm">
                <span className="text-cyan-600 font-semibold">Colaborador: </span>
                <span className="border-b border-cyan-300">{data.colaboradorNome || '________'}</span>
              </div>
              <div className="text-sm">
                <span className="text-cyan-600 font-semibold">CI: </span>
                <span className="border-b border-cyan-300">{data.colaboradorCpfCnpj || '________'}</span>
              </div>
            </div>


            <div className="pt-2">
              <div className="text-cyan-600 font-semibold text-xs mb-1">Assinatura</div>
              <div className="border-b border-cyan-800 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
