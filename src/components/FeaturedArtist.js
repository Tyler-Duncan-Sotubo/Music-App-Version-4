import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Description} from '../modules/Description';
import {GlobalStyles} from '../helpers/color';
import {ImgConfig} from '../hooks/Img-Config';

export const FeaturedArtist = () => {
  const navigation = useNavigation();
  const [allImgs] = ImgConfig();

  const Artists = allImgs.filter(artist => {
    if (artist.tag.includes('trending')) {
      return artist;
    }
  });

  const RenderListItem = ({artist}) => {
    return (
      <Pressable
        style={styles.wrapper}
        onPress={() => {
          navigation.navigate('artist', {
            artist: artist.name,
          });
        }}>
        <Image source={{uri: artist.url}} style={styles.img} />
        <Text style={styles.artist}>{artist.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Description title="Trending Artist" size={15} margin={5} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Artists.map((artist, i) => {
          switch (i) {
            case 0:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 1:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 2:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 3:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 4:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 5:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 6:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            case 7:
              return (
                <View key={i}>
                  <RenderListItem artist={artist} />
                </View>
              );
            default:
              return;
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  wrapper: {
    marginRight: 15,
    marginVertical: 15,
  },
  artist: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginBottom: 5,
  },
});
