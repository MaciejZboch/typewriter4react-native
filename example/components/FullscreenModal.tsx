import type { ReactNode } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { ColorValues } from '../constants/colors';

const FullscreenModal = ({
  isActive,
  children,
  closeModalFunc,
}: {
  isActive: boolean;
  children: ReactNode;
  closeModalFunc: () => void;
}) => {
  return (
    <Modal style={{ flex: 1 }} visible={isActive}>
      <View
        style={{
          position: 'absolute',
          zIndex: 100,
          width: '100%',
          paddingHorizontal: 56,
          paddingTop: 72,
        }}
      >
        <TouchableOpacity onPress={() => closeModalFunc()}>
          <Text style={{ fontSize: 24, color: ColorValues.orange }}>X</Text>
        </TouchableOpacity>
      </View>
      {children}
    </Modal>
  );
};

export default FullscreenModal;
