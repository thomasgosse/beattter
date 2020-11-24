import React from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';

const { height: wHeight, width: wWidth } = Dimensions.get('window');
export const HEADER_IMAGE_HEIGHT = wHeight / 3;

export default function HeaderImage({ y, source }) {
  const styles = StyleSheet.create({
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: wWidth,
      resizeMode: 'cover',
    },
  });
  const height = y.interpolate({
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: 'clamp',
  });
  const top = y.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: 'clamp',
  });

  return (
    <Animated.Image
      source={source}
      style={[
        styles.image,
        {
          top,
          height,
        },
      ]}
    />
  );
}
