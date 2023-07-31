import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import HomeScreen2 from './HomeScreen2';
import SearchScreen from './SearchScreen';
import HomeScreen from './HomeScreen';
import Star from './Star';
import SettingsScreen from './SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const {width, height} = Dimensions.get('window');

import home from '../assets/home.png';
import homefocused from '../assets/homefocused.png';
import category from '../assets/category.png';
import categoryfocused from '../assets/categoryfocused.png';
import more2 from '../assets/more.png';
import more3 from '../assets/morefocused.png';
import more from '../assets/cloud.png';
import morefocused from '../assets/cloudfocused.png';
import profile from '../assets/tag3.png';
import profilefocused from '../assets/tagfocused.png';
import Star1 from '../assets/star.png';
import StarFocused from '../assets/starfocused.png';

function getWidth() {
  let width = Dimensions.get('window').width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  //   const {isDrawerOpen, setIsDrawerOpen} = useAppContext();
  const tabOffsetValue = React.useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,

        // Floating Tab Bar...
        tabBarStyle: {
          backgroundColor: '#123256',
          // position: 'absolute',
          // bottom: 20,
          // marginHorizontal: width * 0.05,
          //   display: isDrawerOpen ? 'none' : 'flex',

          // Max Height...
          height: height * 0.08,
          // borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          // paddingHorizontal: 20,
        },
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen2}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={focused ? homefocused : home}
                style={[
                  styles.tabIconImage,
                  {
                    tintColor: focused ? 'white' : 'white',
                  },
                ]}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={focused ? categoryfocused : category}
                style={[
                  styles.tabIconImage,
                  {
                    tintColor: focused ? 'white' : 'white',
                  },
                ]}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              {/* <View style={styles.centerTabIcon}> */}
              <Image
                source={focused ? more3 : more2}
                style={[
                  styles.tabIconImage,
                  {
                    tintColor: focused ? 'white' : 'white',
                  },
                ]}
              />
              {/* </View> */}
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name="Star"
        component={Star}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={focused ? StarFocused : Star1}
                style={[
                  styles.tabIconImage,
                  {
                    tintColor: focused ? 'white' : 'white',
                  },
                ]}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={focused ? profilefocused : profile}
                style={[
                  styles.tabIconImage,
                  {
                    tintColor: focused ? 'white' : 'white',
                  },
                ]}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

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
