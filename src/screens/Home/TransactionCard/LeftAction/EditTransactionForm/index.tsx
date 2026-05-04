import { useBottomSheetContext } from '@/context/bottomsheet.context';
import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { transactionSchema } from './schema';
import * as Yup from 'yup';
import { useTransactionContext } from '@/context/transaction.context';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { ErrorMessage } from '@/components/ErrorMessage';
import { AppButton } from '@/components/AppButton';
import { SelectCategoryModal } from '@/components/SelectCategoryModal';
import { TransactionTypeSelector } from '@/components/SelectType';
import { Transaction } from '@/shared/interfaces/transaction';
import { UpdateTransactionInterface } from '@/shared/interfaces/https/update-transaction-request';

type ValidaditionErrorsTypes = Record<keyof UpdateTransactionInterface, string>;

interface Params {
  transaction: Transaction;
}
function EditTransactionForm({ transaction: transactionToUpdate }: Params) {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    categoryId: transactionToUpdate.categoryId,
    description: transactionToUpdate.description,
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.typeId,
    value: transactionToUpdate.value,
  });

  const [validaditionErrors, setValidationErrors] =
    useState<ValidaditionErrorsTypes>();

  const handleUpdateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidaditionErrorsTypes;

        error.inner.forEach(err => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionInterface] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, 'Falha ao atualizar transação');
      }
    } finally {
      setLoading(false);
    }
  };

  const setTransactionData = (
    key: keyof UpdateTransactionInterface,
    value: string | number,
  ) => {
    setTransaction(prevData => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          onChangeText={text => setTransactionData('description', text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />

        {validaditionErrors?.description && (
          <ErrorMessage>{validaditionErrors.description}</ErrorMessage>
        )}

        <CurrencyInput
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          maxValue={1000000000}
          onChangeValue={value => setTransactionData('value', value ?? 0)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />

        {validaditionErrors?.value && (
          <ErrorMessage>{validaditionErrors.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={categoryId => setTransactionData('categoryId', categoryId)}
        />

        {validaditionErrors?.categoryId && (
          <ErrorMessage>{validaditionErrors.categoryId}</ErrorMessage>
        )}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={typeId => setTransactionData('typeId', typeId)}
        />

        {validaditionErrors?.typeId && (
          <ErrorMessage>{validaditionErrors.typeId}</ErrorMessage>
        )}

        <View className="my-4">
          <AppButton onPress={handleUpdateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : 'Atualizar'}
          </AppButton>
        </View>
      </View>
    </View>
  );
}

export { EditTransactionForm };
