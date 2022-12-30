import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {MyStack} from './src/navigators/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {SongProvider} from './src/store/Song-Context';
import {FeedBack} from './src/modules/Feedback';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SongProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <MyStack />
      </NavigationContainer>
      <FeedBack />
    </SongProvider>
  );
};

export default App;
