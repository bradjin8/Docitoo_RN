import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MoreStackScreens, DoctorStackScreens, TabStackScreens, Screens, PillStackScreens} from '@/constants/Navigation';

import Home from '@/screens/Home';
import SignUp from '@/screens/SignUp';
import Login from '@/screens/Login';
import ShareMoreDetails from '@/screens/ShareMoreDetails';
import DoctorsByCategory from '@/screens/DoctorsByCategory';
import Doctors from '@/screens/Doctors';
import ViewDoctor from '@/screens/ViewDoctor';
import BookDoctor from '@/screens/BookDoctor';
import More from '@/screens/More';
import TermsAndConditions from '@/screens/TermsAndConditions';
import ContactUs from '@/screens/ContactUs';
import MyProfile from '@/screens/MyProfile';
import EditProfile from '@/screens/EditProfile';
import PillReminder from '@/screens/PillReminder';
import AddPillReminder from '@/screens/AddPillReminder';
import Notifications from '@/screens/Notifications';
import Splash from '@/screens/Splash';

import Colors from '@/styles/Colors';
import useViewModel from './methods';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import __ from '@/assets/lang';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
const tag = 'Route::index';

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
      initialRouteName={TabStackScreens.doctorStack}
      tabBarOptions={{
        activeTintColor: Colors.blue1,
        style: {
          borderTopWidth: 0.5,
          elevation: 10,
          shadowColor: Colors.grey_dark,
          shadowRadius: 10,
          shadowOpacity: 0.75,
        }
      }}
      tabStyle={styles.tabItem}
      labelStyle={styles.tabLabel}
    >
      <Tab.Screen
        name={TabStackScreens.doctorStack}
        component={DoctorStack}
        options={{
          title: __('doctors'),
          tabBarIcon: ({color, size}) => (
            <Icon name={'plus-circle'} color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name={TabStackScreens.notifications}
        component={Notifications}
        options={{
          title: __(TabStackScreens.notifications),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcon name={'bell'} color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name={TabStackScreens.pillReminderStack}
        component={PillReminderStack}
        options={{
          title: __('pill_reminder'),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcon name={'pill'} color={color} size={size}
                                   style={{transform: [/*{rotateX: '180deg'},*/{rotate: '90deg'},/*{rotateZ: '180deg'}*/]}}/>
          ),
        }}
      />
      <Tab.Screen
        name={TabStackScreens.moreStack}
        component={MoreStack}
        options={{
          title: __(MoreStackScreens.more),
          tabBarIcon: ({color, size}) => (
            <FoundationIcon name={'indent-more'} color={color} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function DoctorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={DoctorStackScreens.doctorsByCategory} component={DoctorsByCategory}/>
      <Stack.Screen name={DoctorStackScreens.doctors} component={Doctors}/>
      <Stack.Screen name={DoctorStackScreens.viewDoctor} component={ViewDoctor}/>
      <Stack.Screen name={DoctorStackScreens.bookDoctor} component={BookDoctor}/>
    </Stack.Navigator>
  )
}

function PillReminderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={PillStackScreens.pillReminder} component={PillReminder}/>
      <Stack.Screen name={PillStackScreens.addPillReminder} component={AddPillReminder}/>
    </Stack.Navigator>
  )
}

function MoreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <Stack.Screen name={MoreStackScreens.more} component={More}/>
      <Stack.Screen name={MoreStackScreens.termsAndConditions} component={TermsAndConditions}/>
      <Stack.Screen name={MoreStackScreens.contactUs} component={ContactUs}/>
      <Stack.Screen name={MoreStackScreens.myProfile} component={MyProfile}/>
      <Stack.Screen name={MoreStackScreens.editProfile} component={EditProfile}/>
    </Stack.Navigator>
  )
}

const Route = (props) => {
  const vm = useViewModel(props);
  const {isValid} = vm.store.user && vm.store.data.lastStatus == '401';

  if (vm.isInitializing) {
    return <Splash/>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Screens.home}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name={Screens.home} component={Home}/>
          <Stack.Screen name={Screens.signUp} component={SignUp}/>
          <Stack.Screen name={Screens.logIn} component={Login}/>
          <Stack.Screen name={Screens.shareMoreDetails} component={isValid ? ShareMoreDetails : Login}/>
          <Stack.Screen name={Screens.tabStack} component={TabStack}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Route;
