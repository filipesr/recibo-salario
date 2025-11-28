'use client';

import { TemplateType } from '@/app/types/receipt';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

const templates = [
  {
    id: 'classic' as TemplateType,
    name: 'Clássico',
    description: 'Estilo tradicional amarelo com fonte de máquina de escrever',
    color: 'bg-yellow-50 border-yellow-400',
    icon: '📄',
  },
  {
    id: 'two-column' as TemplateType,
    name: 'Duas Colunas',
    description: 'Recibo azul com canhoto destacável',
    color: 'bg-sky-50 border-cyan-400',
    icon: '📋',
  },
  {
    id: 'modern' as TemplateType,
    name: 'Moderno',
    description: 'Design minimalista e contemporâneo',
    color: 'bg-white border-gray-300',
    icon: '✨',
  },
  {
    id: 'formal' as TemplateType,
    name: 'Formal',
    description: 'Layout corporativo e profissional',
    color: 'bg-slate-50 border-slate-400',
    icon: '🏢',
  },
];

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Escolha o Modelo de Recibo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`
              relative p-6 rounded-lg border-2 transition-all
              ${template.color}
              ${
                selectedTemplate === template.id
                  ? 'ring-4 ring-blue-500 ring-opacity-50 scale-105 shadow-lg'
                  : 'hover:scale-102 hover:shadow-md'
              }
            `}
          >
            {selectedTemplate === template.id && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                ✓
              </div>
            )}

            <div className="text-4xl mb-3">{template.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
