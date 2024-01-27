'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

type SumContextType = {
  sum: number | null;
  updateSum: (operation: string, val: number) => void;
};

interface SumProviderProps {
  children: React.ReactNode;
}

export const SumContext = createContext<SumContextType | null>(null);

export const SumProvider: React.FC<SumProviderProps> = ({ children }) => {
  const [sum, setSum] = useState<number | null>(0);
  console.log('====================================PROVIDEEERR', sum);
  const updateSum = (operation: string, val: number) => {
    setSum((prevSum) => {
      console.log('updateuje sume', val);
      if (!prevSum) {
        // Jeśli sum jest null, zwracamy val jako wartość sumy
        return val;
      } else {
        let result: number;
        operation === '+'
          ? (result = Number(prevSum) + val)
          : (result = Number(prevSum) - val);
        return result;
      }
    });
  };

  const value = useMemo(() => ({ sum, updateSum }), [sum]);

  return <SumContext.Provider value={value}>{children}</SumContext.Provider>;
};

export const useSum = () => {
  const context = useContext(SumContext);
  if (!context) {
    throw new Error('useSum must be used within a SumProvider');
  }
  return context;
};
