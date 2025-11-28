import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TemplateType, validateTemplate } from '@/app/types/receipt';

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

  // Validate template on initial load
  useEffect(() => {
    const validatedTemplate = validateTemplate(selectedTemplate);
    if (validatedTemplate !== selectedTemplate) {
      setSelectedTemplate(validatedTemplate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Change template while preserving compatible data
  const changeTemplate = useCallback(
    (newTemplate: TemplateType) => {
      const validatedTemplate = validateTemplate(newTemplate);
      setSelectedTemplate(validatedTemplate);
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
