import { useBottomSheetContext } from '@/context/bottomsheet.context';
import { colors } from '@/shared/colors';
import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { TransactionTypeSelector } from '../SelectType';

function NewTransaction() {
  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: '',
    typeId: 0,
    value: 0,
  });

  const setTransactionData = (
    key: keyof CreateTransactionInterface,
    value: string | number,
  ) => {
    setTransaction(prevData => ({ ...prevData, [key]: value }));
  };

  const { closeBottomSheet } = useBottomSheetContext();

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

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={typeId => setTransactionData('typeId', typeId)}
        />
      </View>
    </View>
  );
}

export { NewTransaction };
