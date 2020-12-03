import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';

import HeaderBar from './HeaderBar';
import HeaderImage, { HEADER_IMAGE_HEIGHT } from './HeaderImage';

export default function WithImageHeader({ children, uri, setUri, isReadOnly, headerRightAction, isSwiping }) {
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
      <ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        onScroll={(e) => y.setValue(e.nativeEvent.contentOffset.y)}
        scrollEnabled={!isSwiping}
      >
        <View style={styles.placeholder} />
        <View style={{ paddingBottom }}>{children}</View>
      </ScrollView>

      <HeaderImage y={y} uri={uri} setUri={setUri} isReadOnly={isReadOnly} />
      <HeaderBar y={y} onPressModify={headerRightAction} isReadOnly={isReadOnly} />
    </View>
  );
}
