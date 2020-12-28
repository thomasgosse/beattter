import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 10,
    },
    contentContainer: {
      backgroundColor: colors.body,
      padding: 25,
      alignItems: 'center',
      ...containerStyle,
    },
    closeButton: {
      alignSelf: 'flex-end',
      paddingRight: 0,
      paddingBottom: 0,
    },
  });

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} onSwipeComplete={onClose} style={styles.modal}>
      <View style={styles.modalView}>
        <Icon.Button
          backgroundColor={colors.body}
          size={30}
          underlayColor={colors.body}
          name="close-circle"
          color={colors.iconBtn}
          style={styles.closeButton}
          onPress={onClose}
        />
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </Modal>
  );
}
