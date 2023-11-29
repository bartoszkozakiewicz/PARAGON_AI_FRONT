'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/utils/axiosInstace';

type SumContextType = {
  getSum: () => Promise<number | null>;
};

const SumContext = createContext<SumContextType | undefined>(undefined);

export const SumProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getSum = async (): Promise<number | null> => {
    try {
      const res: AxiosResponse<{ sum: number }> = await axiosInstance.get(
        'http://localhost:5000/api/v1/product/sum',
      );
      return res.data.sum;
    } catch (error) {
      console.error('Error fetching sum:', error);
      return null;
    }
  };

  const contextValue: SumContextType = {
    getSum,
  };
  console.log('contextValue', contextValue);
  return (
    <SumContext.Provider value={contextValue}>{children}</SumContext.Provider>
  );
};

export const useSum = () => {
  const context = useContext(SumContext);
  if (!context) {
    throw new Error('useSum must be used within a SumProvider');
  }
  return context;
};
