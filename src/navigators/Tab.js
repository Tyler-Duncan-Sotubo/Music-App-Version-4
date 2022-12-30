/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, Platform} from 'react-native';
import {GlobalStyles} from '../helpers/color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {HomeScreen} from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {FavoriteScreen} from '../screens/FavoriteScreen';

const homeName = 'home';
const libraryName = 'library';
const searchName = 'search';

export const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                fontSize: 9,
                color: GlobalStyles.colors.accentPrimary,
                marginTop: -10,
                textTransform: 'capitalize',
                fontFamily: 'Poppins500',
              }}>
              {focused ? route.name : ''}
            </Text>
          );
        },
        tabBarStyle: {
          paddingBottom: Platform.OS === 'ios' ? 25 : 0,
          backgroundColor: GlobalStyles.colors.tabColor,
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          let routeName = route.name;
          let iconSize;

          switch (routeName) {
            case homeName:
              iconName = focused ? 'home' : 'home-outline';
              iconSize = focused ? 18 : 18;
              break;
            case libraryName:
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              iconSize = focused ? 23 : 20;
              break;
            case searchName:
              iconName = focused ? 'ios-search' : 'ios-search-outline';
              iconSize = focused ? 23 : 20;
              break;
            default:
              return;
          }
          return (
            <Icon
              name={iconName}
              size={iconSize}
              color={GlobalStyles.colors.accentPrimary}
            />
          );
        },
      })}>
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={libraryName} component={FavoriteScreen} />
      <Tab.Screen name={searchName} component={SearchScreen} />
    </Tab.Navigator>
  );
};
