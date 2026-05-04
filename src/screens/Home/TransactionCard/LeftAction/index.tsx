import { useBottomSheetContext } from '@/context/bottomsheet.context';
import { colors } from '@/shared/colors';
import { Transaction } from '@/shared/interfaces/transaction';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { EditTransactionForm } from './EditTransactionForm';

interface Params {
  transaction: Transaction;
}

function LeftAction({ transaction }: Params) {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <Pressable
      onPress={() => {
        openBottomSheet(<EditTransactionForm transaction={transaction} />, 1);
      }}
    >
      <View className="h-[140] bg-accent-blue-dark w-[80] rounded-l-[6] items-center justify-center">
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </Pressable>
  );
}

export { LeftAction };
