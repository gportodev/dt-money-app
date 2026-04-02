import { useBottomSheetContext } from '@/context/bottomsheet.context';
import { colors } from '@/shared/colors';
import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request';
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
import { TransactionTypeSelector } from '../SelectType';
import { SelectCategoryModal } from '../SelectCategoryModal';
import { transactionSchema } from './schema';
import * as Yup from 'yup';
import { AppButton } from '../AppButton';
import { ErrorMessage } from '../ErrorMessage';
import { useTransactionContext } from '@/context/transaction.context';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

type ValidaditionErrorsTypes = Record<keyof CreateTransactionInterface, string>;

function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: '',
    typeId: 0,
    value: 0,
  });

  const [validaditionErrors, setValidationErrors] =
    useState<ValidaditionErrorsTypes>();

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidaditionErrorsTypes;

        error.inner.forEach(err => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionInterface] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, 'Falha ao criar transação');
      }
    } finally {
      setLoading(false);
    }
  };

  const setTransactionData = (
    key: keyof CreateTransactionInterface,
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
          <AppButton onPress={handleCreateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : 'Registrar'}
          </AppButton>
        </View>
      </View>
    </View>
  );
}

export { NewTransaction };
