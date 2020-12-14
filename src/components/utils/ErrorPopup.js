import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Popup from './Popup';

import useRecipesStore from '../../store/useRecipesStore';
import useListsStore from '../../store/useListsStore';

export default function ErrorPopup() {
  const { error: recipeErr, resetError: resetRecipeErr } = useRecipesStore((state) => ({
    error: state.error,
    resetError: state.resetError,
  }));

  const { error: listErr, resetError: resetListErr } = useListsStore((state) => ({
    error: state.error,
    resetError: state.resetError,
  }));

  const [error, setError] = useState(undefined);

  const resetError = () => {
    resetListErr();
    resetRecipeErr();
    setError(undefined);
  };

  useEffect(() => {
    setError(recipeErr || listErr);
  }, [listErr, recipeErr]);

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    modal: {
      backgroundColor: colors.danger,
    },
    text: {
      fontWeight: '500',
      fontSize: 16,
      color: colors.header,
    },
  });

  return (
    <Popup isVisible={!!error} close={resetError} containerStyle={styles.modal} time={3000} todo={true}>
      <Text style={styles.text}>{error}</Text>
    </Popup>
  );
}
