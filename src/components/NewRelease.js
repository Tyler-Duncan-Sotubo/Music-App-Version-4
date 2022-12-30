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
import {AllSongsConfig} from '../hooks/allSongs-config';
import {GlobalStyles} from '../helpers/color';
import {Description} from '../modules/Description';

export const NewRelease = () => {
  const [allSongs] = AllSongsConfig();
  const navigation = useNavigation();

  const newRelease = allSongs.filter(track => {
    if (track.category.includes('new')) {
      return track;
    }
  });

  let length = 18;

  return (
    <View style={styles.container}>
      <Description title="New Singles" size={15} margin={15} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {newRelease.map((item, i) => (
          <View key={i} style={styles.wrapper}>
            <Pressable
              onPress={() => {
                navigation.navigate('Track', {
                  artist: item.artistName,
                  track: item.trackName,
                  youtubeId: item.youtube,
                  itemId: item.id,
                  lyrics: item.lyrics,
                  image: item.artwork,
                });
              }}>
              <Image source={{uri: item.artwork}} style={styles.artwork} />
              <Text style={styles.track}>
                {item.trackName.length > length
                  ? item.trackName.substring(0, length - 3) + '...'
                  : item.trackName}
              </Text>
              <Text style={styles.artist}>{item.artistName}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginVertical: 12,
  },
  wrapper: {
    marginRight: 15,
  },
  description: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  track: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
  artwork: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  artist: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    width: '70%',
    textTransform: 'capitalize',
  },
});
