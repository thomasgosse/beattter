import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ThemeContext } from 'react-native-elements';
import Modal from 'react-native-modal';

export default function Popup({ children, isVisible, close }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    view: {
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.success,
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
  });

  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        close();
      }, 7000);
    }
    return () => clearTimeout(timeout);
  }, [close, isVisible]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={close} style={styles.view}>
      <SafeAreaView style={styles.view}>
        <TouchableWithoutFeedback style={styles.container} onPress={close}>
          {children}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}
