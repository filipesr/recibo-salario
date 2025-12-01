/**
 * Migration utility for localStorage data
 * Migrates from old structure to new structure:
 * - 'issuers' → 'colaboradores'
 * - emitente* fields → colaborador* fields
 * - Add complemento field to payers
 */
export function migrateLocalStorage() {
  try {
    // 1. Migrate 'issuers' → 'colaboradores'
    const issuers = localStorage.getItem('issuers');
    if (issuers && !localStorage.getItem('colaboradores')) {
      localStorage.setItem('colaboradores', issuers);
      console.log('✓ Migrated issuers → colaboradores');
    }

    // 2. Migrate 'currentReceipt' field names
    const currentReceipt = localStorage.getItem('currentReceipt');
    if (currentReceipt) {
      const data = JSON.parse(currentReceipt);
      let changed = false;

      // Rename emitente* fields to colaborador*
      const fieldMappings: Record<string, string> = {
        emitenteNome: 'colaboradorNome',
        emitenteCpfCnpj: 'colaboradorCpfCnpj',
        emitenteEmail: 'colaboradorEmail',
        emitenteCargo: 'colaboradorCargo',
      };

      for (const [oldField, newField] of Object.entries(fieldMappings)) {
        if (oldField in data) {
          data[newField] = data[oldField];
          delete data[oldField];
          changed = true;
        }
      }

      // Remove deprecated fields
      const deprecatedFields = ['emitenteTelefone', 'emitenteEndereco'];
      for (const field of deprecatedFields) {
        if (field in data) {
          delete data[field];
          changed = true;
        }
      }

      // Add pagadorComplemento field if needed (default empty)
      if (!('pagadorComplemento' in data) && 'pagadorEndereco' in data) {
        data.pagadorComplemento = '';
        changed = true;
      }

      if (changed) {
        localStorage.setItem('currentReceipt', JSON.stringify(data));
        console.log('✓ Migrated currentReceipt fields');
      }
    }

    // 3. Update payers to add complemento field
    const payers = localStorage.getItem('payers');
    if (payers) {
      const payerList = JSON.parse(payers);
      let changed = false;

      payerList.forEach((payer: any) => {
        if (!('complemento' in payer)) {
          payer.complemento = '';
          changed = true;
        }
      });

      if (changed) {
        localStorage.setItem('payers', JSON.stringify(payerList));
        console.log('✓ Added complemento field to payers');
      }
    }

    console.log('✅ localStorage migration completed successfully');
  } catch (error) {
    console.error('❌ Error during localStorage migration:', error);
  }
}
