import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TemplateType } from '@/app/types/receipt';

export function useReceiptData() {
  const [formData, setFormData] = useLocalStorage<Record<string, string>>('currentReceipt', {
    data: new Date().toISOString().split('T')[0],
  });

  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<TemplateType>(
    'selectedTemplate',
    'classic'
  );

  // Auto-save form data whenever it changes
  const updateField = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  // Update multiple fields at once (useful for loading payer data)
  const updateFields = useCallback(
    (fields: Record<string, string>) => {
      setFormData((prev) => ({ ...prev, ...fields }));
    },
    [setFormData]
  );

  // Clear all form data (for "Novo Recibo" button)
  const clearReceipt = useCallback(() => {
    setFormData({ data: new Date().toISOString().split('T')[0] });
  }, [setFormData]);

  // Change template while preserving compatible data
  const changeTemplate = useCallback(
    (newTemplate: TemplateType) => {
      setSelectedTemplate(newTemplate);
      // Data is preserved automatically, no need to clear
    },
    [setSelectedTemplate]
  );

  return {
    formData,
    setFormData,
    selectedTemplate,
    updateField,
    updateFields,
    clearReceipt,
    changeTemplate,
  };
}
