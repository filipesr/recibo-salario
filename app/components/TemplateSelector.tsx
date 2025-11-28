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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Modelo:</h3>
        <div className="flex gap-2 flex-wrap flex-1">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm
                ${template.color}
                ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 ring-2 ring-blue-200 font-semibold'
                    : 'hover:border-gray-400'
                }
              `}
              title={template.description}
            >
              <span className="text-lg">{template.icon}</span>
              <span>{template.name}</span>
              {selectedTemplate === template.id && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
