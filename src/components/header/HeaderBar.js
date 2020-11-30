import React, { useContext } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import * as RootNavigation from '../../navigation/RootNavigation';
import { HEADER_IMAGE_HEIGHT } from './HeaderImage';

const MIN_HEADER_HEIGHT = 45;
const ICON_SIZE = 26;

export default function HeaderBar({ y, onPressModify, isReadOnly }) {
  const insets = useSafeArea();
  const { top: paddingTop } = insets;
  let opacity = y.interpolate({
    inputRange: [HEADER_IMAGE_HEIGHT - 200, HEADER_IMAGE_HEIGHT - 150],
    outputRange: [0, 1],
    extrapolateRight: 'clamp',
  });

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const btn = {
    color: colors.header,
    fontSize: 18,
    position: 'absolute',
    top: (ICON_SIZE - 18) / 2,
    right: 16,
  };
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    headerBarContent: {
      height: MIN_HEADER_HEIGHT,
    },
    headerBackBtn: {
      position: 'absolute',
      left: 16,
    },
    headerBarBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.header,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    title: {
      fontSize: 18,
    },
    btn,
    btnBold: {
      ...btn,
      fontWeight: '600',
    },
    btnBlack: {
      ...btn,
      color: 'black',
    },
    btnBoldBlack: {
      ...btn,
      color: 'black',
      fontWeight: '600',
    },
  });

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Animated.View style={[styles.headerBarBackground, { opacity }]} />
      <View style={styles.headerBarContent}>
        <TouchableOpacity onPress={() => RootNavigation.goBack()}>
          <>
            <Icon style={styles.headerBackBtn} name="arrow-back-outline" size={ICON_SIZE} color={colors.header} />
            <Animated.View style={[styles.headerBackBtn, { opacity }]}>
              <Icon name="arrow-back-outline" size={ICON_SIZE} color="black" />
            </Animated.View>
          </>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressModify}>
          {isReadOnly ? <Text style={styles.btn}>Modifier</Text> : <Text style={styles.btnBold}>OK</Text>}
          {isReadOnly ? (
            <Animated.Text style={[styles.btnBlack, { opacity }]}>Modifier</Animated.Text>
          ) : (
            <Animated.Text style={[styles.btnBoldBlack, { opacity }]}>OK</Animated.Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
