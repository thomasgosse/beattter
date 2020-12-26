import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Modal from 'react-native-modal';

export default function BottomModal({ children, onClose, isVisible, containerStyle }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalView: {
      backgroundColor: colors.body,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      ...containerStyle,
    },
  });

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} onSwipeComplete={onClose} style={styles.modal}>
      <View style={styles.modalView}>{children}</View>
    </Modal>
  );
}
