// Base receipt data interface with common fields
export interface BaseReceiptData {
  numero: string;
  valor: string;
  pagador: string;
  valorExtenso: string;
  referente: string;
  cidade: string;
  data: string;
  emitenteNome: string;
  emitenteCpfCnpj: string;
  emitenteTelefone: string;
}

// Classic template (current yellow design)
export interface ClassicReceiptData extends BaseReceiptData {}

// Two-column template with additional address fields
export interface TwoColumnReceiptData extends BaseReceiptData {
  pagadorEndereco: string;
  emitenteEndereco: string;
}

// Modern minimalist template
export interface ModernReceiptData extends BaseReceiptData {
  emitenteEmail?: string;
}

// Formal corporate template with full details
export interface FormalReceiptData extends BaseReceiptData {
  pagadorCpfCnpj: string;
  pagadorEndereco: string;
  emitenteEndereco: string;
  emitenteEmail: string;
}

// GoOn template with company branding
export interface GoonReceiptData extends BaseReceiptData {
  pagadorCpfCnpj: string;
  pagadorEndereco: string;
  pagadorTelefone: string;
  moeda: string;
  emitenteEndereco: string;
  emitenteCargo: string;
}

// Union type for all receipt data types
export type ReceiptData =
  | ClassicReceiptData
  | TwoColumnReceiptData
  | ModernReceiptData
  | FormalReceiptData
  | GoonReceiptData;

// Template types
export type TemplateType = 'classic' | 'two-column' | 'modern' | 'formal' | 'goon';

// Template component props
export interface TemplateProps<T = BaseReceiptData> {
  data: T;
}

// Template definition for selector
export interface TemplateDefinition {
  id: TemplateType;
  name: string;
  description: string;
  previewImage?: string;
  fields: string[]; // List of field names this template requires
}

// Field configuration for dynamic form
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'tel';
  required: boolean;
  placeholder?: string;
  defaultValue?: string;
}

// Payer (Pagador) interface for managing payers
export interface Payer {
  id: string;
  nome: string;
  cpfCnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  responsavel?: string;
}

// Issuer (Emitente) interface for managing issuers
export interface Issuer {
  id: string;
  nome: string;
  cpfCnpj: string;
}

// Saved receipt for JSON export/import
export interface SavedReceipt {
  numero: string;
  data: string;
  valor: string;
  valorExtenso: string;
  pagador: string;
  pagadorCpfCnpj: string;
  pagadorEndereco: string;
  pagadorTelefone: string;
  referente: string;
  cidade: string;
  emitenteNome: string;
  emitenteCpfCnpj: string;
  emitenteEndereco: string;
  emitenteTelefone: string;
  emitenteEmail: string;
  template: TemplateType;
}

// Valid template types array
export const VALID_TEMPLATES: TemplateType[] = ['classic', 'two-column', 'modern', 'formal', 'goon'];

// Validate and return a valid template type with fallback
export function validateTemplate(template: string | undefined | null): TemplateType {
  if (!template) return 'two-column';
  return VALID_TEMPLATES.includes(template as TemplateType)
    ? (template as TemplateType)
    : 'two-column';
}
