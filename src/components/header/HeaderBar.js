import React, { useContext } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import * as RootNavigation from '../../navigation/RootNavigation';
import { HEADER_IMAGE_HEIGHT } from './HeaderImage';

const MIN_HEADER_HEIGHT = 45;
const ICON_SIZE = 26;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function HeaderBar({ y, onPressModify, isReadOnly }) {
  const insets = useSafeArea();
  const { top: paddingTop } = insets;

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    headerBarContent: {
      height: MIN_HEADER_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    headerBarBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.header,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    btn: {
      fontSize: 18,
    },
    btnBold: {
      fontSize: 18,
      fontWeight: '600',
    },
  });

  const opacity = y.interpolate({
    inputRange: [HEADER_IMAGE_HEIGHT - 200, HEADER_IMAGE_HEIGHT - 150],
    outputRange: [0, 1],
    extrapolateRight: 'clamp',
  });
  const color = y.interpolate({
    inputRange: [HEADER_IMAGE_HEIGHT - 200, HEADER_IMAGE_HEIGHT - 150],
    outputRange: [colors.header, 'black'],
  });

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Animated.View style={[styles.headerBarBackground, { opacity }]} />
      <View style={styles.headerBarContent}>
        <TouchableOpacity onPress={() => RootNavigation.goBack()}>
          <AnimatedIcon style={{ color }} name="arrow-back-outline" size={ICON_SIZE} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressModify}>
          {isReadOnly ? (
            <Animated.Text style={[styles.btn, { color }]}>Modifier</Animated.Text>
          ) : (
            <Animated.Text style={[styles.btnBold, { color }]}>OK</Animated.Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
