import React from 'react';
import {MyTabs} from './Tab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TrackScreen} from '../screens/TrackScreen';
import {ChartScreen} from '../screens/ChartScreen';
import {ArtistScreen} from '../screens/ArtistScreen';
import {ArtistSongsScreen} from '../screens/ArtistSongsScreen';
import AlbumScreen from '../screens/AlbumScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={MyTabs} />
      <Stack.Screen
        name="Track"
        component={TrackScreen}
        options={{
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen name="Chart" component={ChartScreen} />
      <Stack.Screen name="artist" component={ArtistScreen} />
      <Stack.Screen name="songs" component={ArtistSongsScreen} />
      <Stack.Screen name="Album" component={AlbumScreen} />
      <Stack.Screen name="player" component={PlayerScreen} />
    </Stack.Navigator>
  );
};
