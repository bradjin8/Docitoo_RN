import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@/constants/Navigation';

import Home from '@/screens/Home';
import Loading from '@/screens/Loading'

import useViewModel from './methods';

const Stack = createStackNavigator();

const Route = () => {
  const vm = useViewModel();

  if (vm.isInitializing) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name={Screens.home} component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Route;
