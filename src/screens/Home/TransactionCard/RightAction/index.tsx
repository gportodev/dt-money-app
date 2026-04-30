import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { DeleteModal } from './DeleteModal';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { fi } from 'date-fns/locale';
import { useSnackbarContext } from '@/context/snackbar.context';

interface Params {
  transactionId: number;
}

function RightAction({ transactionId }: Params) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDeleteTransaction = async () => {
    // Lógica para deletar a transação
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId);
      hideModal();
      notify({
        message: 'Transação deletada com sucesso',
        messageType: 'SUCCESS',
      });
    } catch (error) {
      handleError(error, 'Falha ao deletar a transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
      >
        <MaterialIcons name="delete-outline" size={30} color={colors.white} />
      </TouchableOpacity>
      <DeleteModal
        handleDeleteTransaction={handleDeleteTransaction}
        visible={modalVisible}
        hideModal={hideModal}
      />
    </>
  );
}

export { RightAction };
