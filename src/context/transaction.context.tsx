import { TransactionCategory } from '@/shared/interfaces/https/trasanction-category-response';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import * as transactionService from '@/shared/services/dt-money/transaction.service';

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        categories,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  return context;
};
