import { TemplateProps, GoonReceiptData } from '@/app/types/receipt';
import Image from 'next/image';

export default function GoonTemplate({ data }: TemplateProps<GoonReceiptData>) {
  return (
    <div className="w-full max-w-4xl print-full-width">
      <div className="bg-white border-2 border-black rounded-lg p-5">
        {/* Cabeçalho Superior */}
        <div className="grid grid-cols-[1fr,auto] gap-6 mb-4 pb-12">
          {/* Esquerda: Logo e Info da Empresa */}
          <div className="flex flex-col items-start border rounded">
            <div className="flex m-2 p-2 w-full items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/logo-goon.png"
                  alt="GoOn Logo"
                  width={160}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 text-center">
                <span className='text-3xl'>Actividades Publicitarias</span>
                <span className='text-xs'>DE GRUPO LEGADO</span>
              </div>
            </div>
            <div className="border-b w-full" />
            <div className="text-xs leading-tight p-2 text-center w-full">
              <div className="text-gray-600 text-[10px]">
                {data.pagadorEndereco || 'Endereço do pagador'}
              </div>
              <div className="text-gray-600 text-[10px]">
                Tel: {data.pagadorTelefone || '(000) 000 000'} - {data.pagadorComplemento || 'Cidade'}
              </div>
            </div>
          </div>

          {/* Direita: Título e Número */}
          <div className="text-right">
            <h1 className="text-lg tracking-wide">RECIBO DE DINERO</h1>
            <div className="border rounded px-4 py-2 mb-2">
              <div className="flex gap-2 justify-end items-center mt-1 text-xs">
                <span className="font-semibold text-2xl">{data.valor || ''}</span>
              </div>
            </div>
            <div className="text-xl tracking-wider text-center" style={{ color: '#ff6b35' }} >
              {data.numero || '0000000'}
            </div>
          </div>
        </div>

        {/* Corpo do Recibo */}
        <div className="space-y-3 mb-4">
          {/* Data de Emissão */}
          <div className="text-sm text-end">
            <span className="font-medium">Fecha de Emisión,</span>
            <span className="border-b border-gray-400 mx-2 px-2">
              {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit' }) : '__'}
            </span>
            <span className="font-medium">de</span>
            <span className="border-b border-gray-400 mx-2 px-4">
              {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'long' }) : '___________'}
            </span>
            <span className="font-medium">de</span>
            <span className="border-b border-gray-400 mx-2 px-3">
              {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR', { year: 'numeric' }) : '202____'}
            </span>
          </div>

          {/* Recibí de */}
          <div className="text-sm flex gap-2">
            <span className="font-medium">Recibí(mos) de</span>
            <span className="border-b border-gray-400 px-2 flex-1 inline-block" style={{ minWidth: '300px' }}>
              {data.pagador || '_________________________________'}
            </span>
            <span className="font-medium ml-4">RUC:</span>
            <span className="border-b border-gray-400 px-2 inline-block" style={{ minWidth: '120px' }}>
              {data.pagadorCpfCnpj || '______________'}
            </span>
          </div>

          {/* Valor por extenso */}
          <div className='flex gap-2 items-center'>
            <span className="text-sm font-medium">la cantidad de</span>
            <span className="bg-blue-50 border border-gray-300 rounded p-2 min-h-[35px] text-sm flex-1">
            {data.valorExtenso || ''}
            </span>
          </div>

          {/* En concepto de */}
          <div className='flex gap-2 items-cente flex-wrap'>
            <span className="text-sm font-medium">en concepto de</span>
            <span className=" border-b text-sm flex-1 ">
              {data.referente || ''}
            </span>
          </div>
        </div>

        {/* Rodapé - Assinaturas */}
        <div className="mt-6 pt-4 space-y-3">
          <div className="text-sm">
            <span className="font-medium">Firma:</span>
            <span className="border-b border-gray-400 ml-2 inline-block" style={{ width: '400px' }}></span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Aclaración:</span>
            <span className="border-b border-gray-400 ml-2 inline-block" style={{ width: '370px' }}>{data.colaboradorNome || ''}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">C.I.Nº:</span>
            <span className="border-b border-gray-400 ml-2 inline-block" style={{ width: '390px' }}>{data.colaboradorCpfCnpj || ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
