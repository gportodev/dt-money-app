import { useTransactionContext } from '@/context/transaction.context';
import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

function FilterInput() {
  const { pagination } = useTransactionContext();

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center mt-4 mb-3">
        <Text className="text-white text-xl font-bold">Transações</Text>
        <Text className="text-gray-700 text-base">
          {pagination.totalRows} {pagination.totalRows === 1 ? 'Item' : 'Itens'}
        </Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput
          className="h-[50] text-white w-full bg-background-primary text-lg pl-4"
          placeholder="Buscar transações..."
          placeholderTextColor={colors.gray[600]}
        />

        <TouchableOpacity className="absolute right-0">
          <MaterialIcons
            name="filter-list"
            color={colors['accent-brand-light']}
            size={26}
            className="mr-3"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

export { FilterInput };
