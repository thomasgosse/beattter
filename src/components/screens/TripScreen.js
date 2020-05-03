import * as React from 'react';
import { Animated, TouchableOpacity, Text } from 'react-native';
import { useCollapsibleStack } from 'react-navigation-collapsible';

function TripScreen({ navigation }) {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(i);
  }

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleStack();

  return (
    <Animated.FlatList
      data={data}
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: containerPaddingTop }}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Trips')}
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: 'gray',
            borderBottomWidth: 1
          }}
        >
          <Text
            style={{
              fontSize: 22
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.toString()}
    />
  );
}

export default TripScreen;
