import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'react-native-elements';

export default function DualButton({ firstOnPress, secondOnPress }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    dualContainer: {
      marginTop: 20,
      maxWidth: Dimensions.get('window').width * 0.9,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    btn: {
      flex: 0.5,
      marginHorizontal: 5,
      backgroundColor: colors.button,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    text: {
      marginLeft: 5,
      fontWeight: '500',
      fontSize: 16,
      color: colors.body,
    },
  });

  return (
    <View style={styles.dualContainer}>
      <TouchableOpacity onPress={firstOnPress} style={styles.btn}>
        <Icon
          backgroundColor={colors.button}
          size={26}
          underlayColor={colors.button}
          name="add-circle-outline"
          color={colors.body}
        />
        <Text style={styles.text}>Ingrédient</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={secondOnPress} style={styles.btn}>
        <Icon
          backgroundColor={colors.button}
          size={26}
          underlayColor={colors.button}
          name="book-outline"
          color={colors.body}
        />
        <Text style={styles.text}>Recettes</Text>
      </TouchableOpacity>
    </View>
  );
}
