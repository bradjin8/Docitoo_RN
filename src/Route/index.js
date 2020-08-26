import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@/constants/Navigation';

import Home from '@/screens/Home';
import SignUp from '@/screens/SignUp';
import Login from '@/screens/Login';
import ShareMoreDetails from '@/screens/ShareMoreDetails';
import Doctors from '@/screens/Doctors';
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
          <Stack.Screen name={Screens.signUp} component={SignUp}/>
          <Stack.Screen name={Screens.logIn} component={Login}/>
          <Stack.Screen name={Screens.shareMoreDetails} component={ShareMoreDetails}/>
          <Stack.Screen name={Screens.doctors} component={Doctors}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Route;
