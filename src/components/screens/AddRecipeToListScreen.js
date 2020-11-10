import React from 'react';
import { Button, Text, View } from 'react-native';

import * as RootNavigation from '../RootNavigation';

export default function AddRecipeToListScreen() {
  return (
    <View>
      <Text>My Screen</Text>
      <Button title="TODO" onPress={() => RootNavigation.navigate('CreateList')} />
    </View>
  );
}
