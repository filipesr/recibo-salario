import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Payer } from '@/app/types/receipt';

export function usePayers() {
  const [payers, setPayers] = useLocalStorage<Payer[]>('payers', []);

  const addPayer = useCallback(
    (payer: Omit<Payer, 'id'>) => {
      const newPayer: Payer = {
        ...payer,
        id: Date.now().toString(),
      };
      setPayers((prev) => [...prev, newPayer]);
      return newPayer;
    },
    [setPayers]
  );

  const updatePayer = useCallback(
    (id: string, updatedPayer: Partial<Omit<Payer, 'id'>>) => {
      setPayers((prev) =>
        prev.map((payer) =>
          payer.id === id ? { ...payer, ...updatedPayer } : payer
        )
      );
    },
    [setPayers]
  );

  const deletePayer = useCallback(
    (id: string) => {
      setPayers((prev) => prev.filter((payer) => payer.id !== id));
    },
    [setPayers]
  );

  const getPayer = useCallback(
    (id: string) => {
      return payers.find((payer) => payer.id === id);
    },
    [payers]
  );

  return {
    payers,
    addPayer,
    updatePayer,
    deletePayer,
    getPayer,
  };
}
