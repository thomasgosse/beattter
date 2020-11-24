import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';

import HeaderBar from './HeaderBar';
import HeaderImage, { HEADER_IMAGE_HEIGHT } from './HeaderImage';

export default function WithImageHeader({ children, source, isReadOnly, headerRightAction }) {
  const y = new Animated.Value(0);
  const insets = useSafeArea();
  const { bottom: paddingBottom } = insets;

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    header: { backgroundColor: colors.body, flex: 1 },
    placeholder: {
      height: HEADER_IMAGE_HEIGHT,
    },
  });

  return (
    <View style={styles.header}>
      <HeaderImage y={y} source={source} />

      <ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        onScroll={(e) => y.setValue(e.nativeEvent.contentOffset.y)}
      >
        <View style={styles.placeholder} />
        <View style={{ paddingBottom }}>{children}</View>
      </ScrollView>

      <HeaderBar y={y} onPressModify={headerRightAction} isReadOnly={isReadOnly} />
    </View>
  );
}
