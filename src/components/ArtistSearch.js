import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import {ImgConfig} from '../hooks/Img-Config';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../helpers/color';

export const ArtistSearch = () => {
  const navigation = useNavigation();
  const [allImgs] = ImgConfig();

  const Artists = allImgs.filter(artist => {
    if (artist.tag.includes('trending')) {
      return artist;
    }
  });

  const RenderList = ({artist, color}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('artist', {
            artist: artist.name,
          });
        }}
        key={artist.name}>
        <View style={[styles.container, {backgroundColor: color}]}>
          <Text style={styles.artist}>{artist.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      {Artists.map((artist, i) => {
        switch (i) {
          case 0:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 1:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 2:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 3:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 4:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 5:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 6:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          case 7:
            return (
              <View key={i}>
                <RenderList artist={artist} />
              </View>
            );
          default:
            return;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: 70, height: 70, marginRight: 15, borderRadius: 5},
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: Platform.OS === 'ios' ? 10 : 0,
  },
  container: {
    borderColor: GlobalStyles.colors.primaryText,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
});
