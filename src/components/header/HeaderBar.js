import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Text, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import * as RootNavigation from '../../navigation/RootNavigation';
import { HEADER_IMAGE_HEIGHT } from './HeaderImage';

const MIN_HEADER_HEIGHT = 45;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerBarContent: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    color: 'black',
    fontSize: 18,
  },
  btnBold: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});

export default function HeaderBar({ y, onPressModify, isReadOnly }) {
  const insets = useSafeArea();
  const { top: paddingTop } = insets;
  let opacity = y.interpolate({
    inputRange: [HEADER_IMAGE_HEIGHT - 200, HEADER_IMAGE_HEIGHT - 150],
    outputRange: [0, 1],
    extrapolateRight: 'clamp',
  });

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Animated.View style={[styles.headerBarBackground, { opacity }]} />
      <View style={styles.headerBarContent}>
        <TouchableWithoutFeedback onPress={() => RootNavigation.goBack()}>
          <Icon name="arrow-back-outline" size={26} color="black" />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.title, { opacity }]} />
        <TouchableOpacity onPress={onPressModify}>
          {isReadOnly ? <Text style={styles.btn}>Modifier</Text> : <Text style={styles.btnBold}>OK</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
