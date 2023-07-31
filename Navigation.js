import React from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import ItemList from './Screens/ItemList';
import Onboarding from './Screens/OnBoarding';
import HomeScreen from './Screens/HomeScreen';
import HomeScreen2 from './Screens/HomeScreen2';
import SearchScreen from './Screens/SearchScreen';
import SettingsScreen from './Screens/SettingsScreen';
import AddItem from './Screens/AddItem';
import Star from './Screens/Star';
import DrawerScreen from './Screens/DrawerNavigator';
import {useAppContext} from './Screens/AppContext';
const {width, height} = Dimensions.get('window');
import home from './assets/home.png';
import homefocused from './assets/homefocused.png';
import category from './assets/category.png';
import categoryfocused from './assets/categoryfocused.png';
import more2 from './assets/more.png';
import more3 from './assets/morefocused.png';
import more from './assets/cloud.png';
import morefocused from './assets/cloudfocused.png';
import profile from './assets/tag3.png';
import profilefocused from './assets/tagfocused.png';
import Star1 from './assets/star.png';
import StarFocused from './assets/starfocused.png';
import TabNavigator from './Screens/TabNavigator';
import DrawerNavigator from './Screens/DrawerNavigator';

function getWidth() {
  let width = Dimensions.get('window').width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ItemList"
          component={ItemList}
          options={() => ({
            headerShown: false,
            tabBarStyle: {display: 'none'},
            tabBarButton: () => null,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  centerTabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#123256',
    borderRadius: 28,
    transform: [{translateY: -16}],
  },
});
