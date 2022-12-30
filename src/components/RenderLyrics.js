import React from 'react';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    margin: '10px',
    fontSize: '16px',
  },
  div: {margin: '10px'},
  a: {color: 'green'},
  p: {fontSize: '18px', margin: '5px', fontFamily: 'Poppins-SemiBold'},
  h2: {fontSize: '18px', margin: '15px 0'},
};

const RenderLyrics = ({lyrics}) => {
  const {width} = useWindowDimensions();

  return (
    <View>
      <View>
        <RenderHtml
          source={{html: lyrics}}
          contentWidth={width}
          tagsStyles={tagsStyles}
          startInLoadingState={false}
        />
      </View>
    </View>
  );
};

export default RenderLyrics;
