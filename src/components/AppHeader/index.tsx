import { useAuthContext } from '@/context/auth.context';
import { useBottomSheetContext } from '@/context/bottomsheet.context';
import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

function AppHeader() {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <View className="w-full flex-row p-8 justify-between">
      <View>
        <Image
          source={require('@/assets/Logo.png')}
          className="w-[130px] h-[30px]"
        />

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
        >
          <MaterialIcons name="logout" color={colors.gray[700]} size={15} />
          <Text className="text-gray-700 text-base">Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() =>
          openBottomSheet(<Text>Formulario da nova transação</Text>, 0)
        }
        className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
      >
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
}

export { AppHeader };
