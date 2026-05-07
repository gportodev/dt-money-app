import { TransactionCategory } from '@/shared/interfaces/https/trasanction-category-response';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request';
import { Transaction } from '@/shared/interfaces/transaction';
import { TotalTransactions } from '@/shared/interfaces/total-transactions';
import { UpdateTransactionInterface } from '@/shared/interfaces/https/update-transaction-request';
import { set } from 'date-fns';

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
  loading: boolean;
};

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    },
  );

  const refreshTransactions = async () => {
    setLoading(true);
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
    await refreshTransactions();
  };

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await transactionService.updateTransaction(transaction);
    await refreshTransactions();
  };

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        categories,
        createTransaction,
        updateTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        refreshTransactions,
        loading,
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
