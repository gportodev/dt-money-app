import React from 'react';
import { Text } from 'react-native';

function EmptyList() {
  return (
    <Text className="text-center text-gray-600 text-lg mt-4">
      Nenhuma transação encontrada
    </Text>
  );
}

export { EmptyList };
