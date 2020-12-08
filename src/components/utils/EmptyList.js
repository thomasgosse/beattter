import React, { useContext } from 'react';
import { ScrollView, Image, Text, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Button from './Button';

export default function EmptyList({ source, text, btnText, onPress, children }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.body,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      alignSelf: 'center',
      height: 300,
      resizeMode: 'contain',
    },
    text: {
      width: '80%',
      fontSize: 16,
      color: colors.textBase,
      textAlign: 'center',
      marginVertical: 20,
    },
  });
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Image style={styles.image} source={source} />
      <Text style={styles.text}>{text}</Text>
      {children ? children : <Button text={btnText} onPress={onPress} />}
    </ScrollView>
  );
}
