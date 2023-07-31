import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddItem from './AddItem';
import CustomDrawer from './CustomDrawer';

import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home Screen"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Upload"
        component={AddItem}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
