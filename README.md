# 📄 Gerador de Recibos

Aplicação web moderna para criar recibos de pagamento profissionais com múltiplos modelos.

## ✨ Características

- **4 Templates Profissionais:**
  - 📄 **Clássico** - Estilo tradicional amarelo com fonte de máquina de escrever
  - 📋 **Duas Colunas** - Recibo azul com canhoto destacável (baseado em modelo brasileiro)
  - ✨ **Moderno** - Design minimalista e contemporâneo
  - 🏢 **Formal** - Layout corporativo e profissional

- **Funcionalidades:**
  - Seleção intuitiva de templates
  - Formulário dinâmico que se adapta ao template escolhido
  - Preview em tempo real do recibo
  - Impressão otimizada com CSS específico
  - Campos customizáveis por template
  - Design responsivo

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **React 18** - Biblioteca UI

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🎯 Como Usar

1. Acesse `http://localhost:3000`
2. Escolha um dos 4 modelos de recibo disponíveis
3. Preencha os dados no formulário à esquerda
4. Veja o preview do recibo em tempo real à direita
5. Clique em "Imprimir Recibo" para imprimir ou salvar como PDF

## 📂 Estrutura do Projeto

```
app/
├── components/
│   ├── templates/           # Templates de recibo
│   │   ├── ClassicTemplate.tsx
│   │   ├── TwoColumnTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   └── FormalTemplate.tsx
│   └── TemplateSelector.tsx # Seletor de templates
├── types/
│   └── receipt.ts           # Tipos TypeScript
├── globals.css              # Estilos globais e impressão
├── layout.tsx               # Layout principal
└── page.tsx                 # Página principal
```

## 🎨 Templates

### Clássico
Ideal para recibos tradicionais. Inclui campos básicos como número, valor, pagador, valor por extenso, referente, cidade, data e dados do emitente.

### Duas Colunas
Baseado em modelo brasileiro tradicional com canhoto destacável. Inclui campos de endereço para pagador e emitente.

### Moderno
Design minimalista e limpo, perfeito para profissionais modernos. Inclui campo opcional de e-mail.

### Formal
Template corporativo completo com todos os campos, ideal para empresas e transações formais.

## 🖨️ Impressão

O sistema utiliza CSS otimizado para impressão:
- Cores preservadas na impressão
- Tamanho A4 configurado
- Remove elementos de UI (botões, seletores)
- Evita quebras de página indesejadas
- Layout otimizado para impressoras

## 🔧 Personalização

Para adicionar novos templates:

1. Crie um novo componente em `app/components/templates/`
2. Defina a interface de dados em `app/types/receipt.ts`
3. Adicione os campos no `templateFields` em `app/page.tsx`
4. Adicione o template no `TemplateSelector`
5. Importe e renderize no `page.tsx`

## 📝 Licença

Projeto de código aberto para uso livre.
