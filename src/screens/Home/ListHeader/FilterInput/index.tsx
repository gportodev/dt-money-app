import { useBottomSheetContext } from '@/context/bottomsheet.context';
import { useTransactionContext } from '@/context/transaction.context';
import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TransactionsFilters } from './TransactionsFilters';

function FilterInput() {
  const { pagination, setSearchText, searchText, fetchTransactions } =
    useTransactionContext();

  const { openBottomSheet } = useBottomSheetContext();

  const [text, setText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      // Aqui você pode chamar a função de busca de transações, passando o texto como parâmetro
      // Exemplo: fetchTransactions({ search: text });
      setSearchText(text);
    }, 500); // Aguarda 500ms após o usuário parar de digitar

    return () => {
      clearTimeout(handler); // Limpa o timeout se o usuário começar a digitar novamente
    };
  }, [text]);

  useEffect(() => {
    (async () => {
      try {
        await fetchTransactions({ page: 1 });
      } catch (error) {}
    })();
  }, [searchText]);

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
          value={text}
          onChangeText={setText}
          className="h-[50] text-white w-full bg-background-primary text-lg pl-4"
          placeholder="Buscar transações..."
          placeholderTextColor={colors.gray[600]}
        />

        <TouchableOpacity
          onPress={() => openBottomSheet(<TransactionsFilters />, 1)}
          className="absolute right-0"
        >
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
