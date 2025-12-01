import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Colaborador } from '@/app/types/receipt';

export function useColaboradores() {
  const [colaboradores, setColaboradores] = useLocalStorage<Colaborador[]>('colaboradores', []);

  const addColaborador = useCallback(
    (colaborador: Omit<Colaborador, 'id'>) => {
      const newColaborador: Colaborador = {
        ...colaborador,
        id: Date.now().toString(),
      };
      setColaboradores((prev) => [...prev, newColaborador]);
      return newColaborador;
    },
    [setColaboradores]
  );

  const updateColaborador = useCallback(
    (id: string, updatedColaborador: Partial<Omit<Colaborador, 'id'>>) => {
      setColaboradores((prev) =>
        prev.map((colaborador) =>
          colaborador.id === id ? { ...colaborador, ...updatedColaborador } : colaborador
        )
      );
    },
    [setColaboradores]
  );

  const deleteColaborador = useCallback(
    (id: string) => {
      setColaboradores((prev) => prev.filter((colaborador) => colaborador.id !== id));
    },
    [setColaboradores]
  );

  const getColaborador = useCallback(
    (id: string) => {
      return colaboradores.find((colaborador) => colaborador.id === id);
    },
    [colaboradores]
  );

  return {
    colaboradores,
    addColaborador,
    updateColaborador,
    deleteColaborador,
    getColaborador,
  };
}
