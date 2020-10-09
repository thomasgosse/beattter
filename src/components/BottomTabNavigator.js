import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import useColors from './themes/colors';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  const colors = useColors();

  function getHeaderStyle() {
    const routeName = route.state?.routes[route.state.index]?.name ?? 'Home';
    // if (routeName === 'Home') {
    return {
      backgroundColor: colors.primary,
      shadowOpacity: 0,
      elevation: 0,
    };
    // } else {
    //   return {
    //     backgroundColor: colors.primary,
    // };
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: getHeaderStyle(),
      headerTitle: route.state?.routes[route.state.index]?.name || 'Home',
      headerTitleStyle: {
        color: colors.textTitle,
        fontWeight: 'bold',
        fontSize: 28,
        backgroundColor: colors.primary,
      },
    });
  }, [route]);

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: { backgroundColor: colors.primary },
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon size={26} name="user" color={focused ? colors.textTitle : colors.textBaseLight} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon size={26} name="map" color={focused ? colors.textTitle : colors.textBaseLight} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
