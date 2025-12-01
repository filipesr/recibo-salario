import { TemplateProps, FormalReceiptData } from '@/app/types/receipt';

export default function FormalTemplate({ data }: TemplateProps<FormalReceiptData>) {
  return (
    <div className="w-full max-w-4xl bg-white border border-gray-300 print-full-width">
      {/* Header Corporativo */}
      <div className="bg-slate-800 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold uppercase">Recibo de Pagamento</h1>
            <p className="text-sm text-slate-300 mt-1">Comprovante de Transação Financeira</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-300">Nº do Documento</div>
            <div className="text-2xl font-bold">{data.numero || '______'}</div>
          </div>
        </div>
      </div>

      {/* Informações do Valor */}
      <div className="bg-slate-100 p-6 border-b border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Valor Numérico
            </label>
            <div className="bg-white border-2 border-slate-800 rounded p-3 text-center">
              <span className="text-3xl font-bold text-slate-900">{data.valor || '0,00'}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Data da Emissão
            </label>
            <div className="bg-white border border-slate-300 rounded p-3 text-center">
              <span className="text-xl text-slate-900">
                {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
            Valor por Extenso
          </label>
          <div className="bg-white border border-slate-300 rounded p-3">
            <span className="text-slate-900">{data.valorExtenso || '_____________________'}</span>
          </div>
        </div>
      </div>

      {/* Dados do Pagador */}
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-sm font-bold text-slate-800 uppercase mb-4 pb-2 border-b-2 border-slate-800">
          Dados do Pagador
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome/Razão Social</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.pagador || '________________________________'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">CPF/CNPJ</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.pagadorCpfCnpj || '________________________'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cidade</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.cidade || '________________________'}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Endereço Completo</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.pagadorEndereco || '________________________________'}
            </div>
          </div>
        </div>
      </div>

      {/* Descrição do Pagamento */}
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-sm font-bold text-slate-800 uppercase mb-4 pb-2 border-b-2 border-slate-800">
          Descrição do Pagamento
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Referente a</label>
          <div className="border border-slate-300 rounded p-3 min-h-[80px] text-slate-900 bg-gray-50">
            {data.referente || 'Descrição do serviço ou produto fornecido...'}
          </div>
        </div>
      </div>

      {/* Dados do Colaborador/Recebedor */}
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-sm font-bold text-slate-800 uppercase mb-4 pb-2 border-b-2 border-slate-800">
          Dados do Recebedor (Colaborador)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome/Razão Social</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.colaboradorNome || '________________________________'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">CPF/CNPJ</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.colaboradorCpfCnpj || '________________'}
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
            <div className="border-b-2 border-slate-300 pb-1 text-slate-900">
              {data.colaboradorEmail || '________________________________'}
            </div>
          </div>
        </div>
      </div>

      {/* Declaração Legal e Assinatura */}
      <div className="p-6">
        <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-6">
          <p className="text-xs text-slate-700 text-justify leading-relaxed">
            <strong>DECLARAÇÃO:</strong> Declaro para os devidos fins que recebi o valor acima especificado,
            referente ao(s) serviço(s)/produto(s) descrito(s), firmando o presente recibo para que produza
            os seus legais efeitos, dando plena, rasa e irrevogável quitação pelo valor recebido.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-8">
          <div className="text-xs text-slate-600">
            <div className="mb-1">Documento emitido em:</div>
            <div className="font-semibold">{data.cidade || '_______'}, {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : '__/__/____'}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-80 border-t-2 border-slate-800 pt-2 mt-12">
              <div className="text-center">
                <div className="text-sm font-bold text-slate-900">{data.colaboradorNome || '__________________'}</div>
                <div className="text-xs text-slate-600">Assinatura do Recebedor</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 text-slate-400 p-3 text-center text-xs">
        Este documento possui validade jurídica como comprovante de pagamento
      </div>
    </div>
  );
}
