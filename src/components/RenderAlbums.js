/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../helpers/color';

export const RenderAlbums = ({item, width, height, flex, bottom}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Album', {
            itemId: item.id,
            featuredImg: item[0].artwork,
            albumName: item[0].AlbumName,
            artistName: item[0].artistName,
          });
        }}>
        <View
          style={{
            flexDirection: flex,
          }}>
          <Image
            source={{uri: item[0].artwork}}
            style={{
              width: width,
              height: height,
              marginBottom: bottom,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={styles.album}>{item[0].AlbumName}</Text>
            <Text style={styles.artist}>{item[0].artistName}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginRight: 10,
  },
  album: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  artist: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
});
