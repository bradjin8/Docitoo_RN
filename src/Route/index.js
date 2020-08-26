import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabs, Screens} from '@/constants/Navigation';

import Home from '@/screens/Home';
import SignUp from '@/screens/SignUp';
import Login from '@/screens/Login';
import ShareMoreDetails from '@/screens/ShareMoreDetails';
import Doctors from '@/screens/Doctors';
import Loading from '@/screens/Loading';

import Colors from '@/styles/Colors';
import useViewModel from './methods';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import __ from '@/assets/lang';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabItem: {
    fontSize: 20
  },
  tabLabel: {
    fontSize: 20
  }
});

function TabStack() {
  return (
      <Tab.Navigator
        initialRouteName={BottomTabs.doctors}
        tabBarOptions={{activeTintColor: Colors.blue1}}
        tabStyle={styles.tabItem}
        labelStyle={styles.tabLabel}
      >
        <Tab.Screen
          name={BottomTabs.doctors}
          component={Doctors}
          options={{
            title: __(BottomTabs.doctors),
            tabBarIcon: ({color, size}) => (
              <Icon name={'plus-circle'} color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name={BottomTabs.notifications}
          component={Doctors}
          options={{
            title: __(BottomTabs.notifications),
            tabBarIcon: ({color, size}) => (
              <Icon name={'bell'} color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name={BottomTabs.pillReminders}
          component={Doctors}
          options={{
            title: __(BottomTabs.pillReminders),
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcon name={'pill'} color={color} size={size}  style={{transform: [/*{rotateX: '180deg'},*/{rotate: '90deg'},/*{rotateZ: '180deg'}*/]}}/>
            ),
          }}
        />
        <Tab.Screen
          name={BottomTabs.more}
          component={Doctors}
          options={{
            title: __(BottomTabs.more),
            tabBarIcon: ({color, size}) => (
              <FoundationIcon name={'indent-more'} color={color} size={size}/>
            ),
          }}
        />
      </Tab.Navigator>
  )
}

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
          <Stack.Screen name={Screens.tabStack} component={TabStack}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Route;
