import { TemplateProps, ModernReceiptData } from '@/app/types/receipt';

export default function ModernTemplate({ data }: TemplateProps<ModernReceiptData>) {
  return (
    <div className="w-full max-w-3xl bg-white p-8 md:p-12 shadow-sm print-full-width">
      {/* Header Minimalista */}
      <div className="flex justify-between items-start mb-12 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-2">Recibo</h1>
          <div className="text-sm text-gray-500">
            Nº {data.numero || '___'}
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-gray-900">
            {data.valor || '0,00'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '__/__/____'}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="space-y-8 mb-12">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Recebido de
          </label>
          <div className="text-xl text-gray-900">
            {data.pagador || '___________________________'}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Valor por extenso
          </label>
          <div className="text-lg text-gray-900">
            {data.valorExtenso || '___________________________'}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Referente a
          </label>
          <div className="text-lg text-gray-900">
            {data.referente || '___________________________'}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 p-4 rounded mb-12">
        <p className="text-xs text-gray-600 text-center leading-relaxed">
          Este recibo confirma o pagamento referenciado acima e serve como comprovante de quitação integral do valor recebido.
        </p>
      </div>

      {/* Footer com informações do Emitente */}
      <div className="pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Dados do Emitente */}
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium text-gray-900">
                {data.emitenteNome || '__________________'}
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>CPF/CNPJ: {data.emitenteCpfCnpj || '__________________'}</div>
              <div>Tel: {data.emitenteTelefone || '__________________'}</div>
              {data.emitenteEmail && (
                <div>Email: {data.emitenteEmail}</div>
              )}
            </div>
          </div>

          {/* Assinatura */}
          <div className="flex flex-col items-end">
            <div className="text-xs text-gray-500 mb-2 text-right">
              {data.cidade || '_______'}
            </div>
            <div className="border-t border-gray-900 w-64 pt-2">
              <div className="text-xs text-gray-500 text-center">Assinatura</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
