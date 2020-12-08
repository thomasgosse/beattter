import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Platform, ActionSheetIOS, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DocumentDirectoryPath, copyFile } from 'react-native-fs';

const { height: wHeight, width: wWidth } = Dimensions.get('window');
export const HEADER_IMAGE_HEIGHT = wHeight / 3;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function HeaderImage({ y, uri, setUri, isReadOnly, setIsImageAvailable }) {
  const [source, setSource] = useState(uri ? { uri } : require('../../assets/empty-recipes.png'));

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
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
  const bottom = y.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [Dimensions.get('window').height - HEADER_IMAGE_HEIGHT, Dimensions.get('window').height],
    extrapolateLeft: 'clamp',
  });

  async function imagePickerCallback(result) {
    if (result.didCancel) {
      return;
    }
    const destPath = DocumentDirectoryPath + '/' + result.fileName;
    await copyFile(result.uri, destPath);
    setUri(destPath);
  }

  function getActionSheet() {
    if (isReadOnly) return;

    const options = {
      mediaType: 'photo',
      maxHeight: 1600,
      maxWidth: 1600,
      includeBase64: false,
      quality: 0.8,
    };

    if (Platform.OS === 'ios') {
      return ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Annuler', 'À partir de la bibliothèque', 'Prendre une photo'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            launchImageLibrary(options, imagePickerCallback);
          } else if (buttonIndex === 2) {
            launchCamera(options, imagePickerCallback);
          }
        }
      );
    }
  }

  useEffect(() => {
    setSource(uri ? { uri } : require('../../assets/empty-recipes.png'));
  }, [uri, setSource]);

  const onLoad = () => {
    if (source.uri === uri) {
      setIsImageAvailable(true);
    }
  };

  const onError = () => {
    setSource(require('../../assets/empty-recipes.png'));
    setIsImageAvailable(false);
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={isReadOnly ? 1 : 0.2}
      style={[styles.container, { bottom }]}
      onPress={getActionSheet}
    >
      <Animated.Image
        source={source}
        blurRadius={isReadOnly ? 0 : 4}
        style={[styles.image, { top, height }]}
        onLoad={onLoad}
        onError={onError}
      />
      {!isReadOnly && <Icon name="camera" size={50} color={colors.header} />}
    </AnimatedTouchableOpacity>
  );
}
