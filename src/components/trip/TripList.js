import React from 'react';
import { View, Text } from 'react-native';

function TripList({ trips }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {trips.map((trip, i) => (
        <Text key={i}>Home!</Text>
      ))}
    </View>
  );
}

export default TripList;
