import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';

import Button from './Button';
import Label from './Label';
import BottomModal from './BottomModal';
import { ThemeContext } from 'react-native-elements';
import { Keyboard } from 'react-native';

export default function PickerModal({ list, triggerLabel, selectedValue, onValueChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const close = () => setModalVisible(false);
  const open = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    modal: { paddingTop: 10 },
    picker: { flex: 1 },
    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      color: colors.textBase,
      fontSize: 18,
    },
    divider: {
      marginTop: 5,
      borderBottomColor: colors.inputDivider,
      borderBottomWidth: 1,
    },
    modalTrigger: {
      flex: 1,
      marginRight: 10,
    },
    label: {
      marginBottom: 7,
    },
  });

  if (!modalVisible) {
    return (
      <TouchableOpacity onPress={open} style={styles.modalTrigger}>
        <Label label={triggerLabel} containerStyle={styles.label} />
        <Text style={styles.input}>{selectedValue}</Text>
        <View style={styles.divider} />
      </TouchableOpacity>
    );
  }

  return (
    <BottomModal isVisible={modalVisible} onClose={close} containerStyle={styles.modal}>
      <View style={styles.pickerContainer}>
        <Picker mode="dialog" style={styles.picker} selectedValue={selectedValue} onValueChange={onValueChange}>
          {list.map((item) => {
            return <Picker.Item label={item} key={item} value={item} />;
          })}
        </Picker>
      </View>
      <Button text="Selectionner" onPress={close} />
    </BottomModal>
  );
}
