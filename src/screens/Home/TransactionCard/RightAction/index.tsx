import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { DeleteModal } from './DeleteModal';

function RightAction() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
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
      <DeleteModal visible={modalVisible} hideModal={hideModal} />
    </>
  );
}

export { RightAction };
