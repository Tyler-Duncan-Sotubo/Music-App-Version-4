import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {AllSongsConfig} from '../hooks/allSongs-config';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../helpers/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {Description} from '../modules/Description';

export const TrendingSongs = () => {
  //All Songs From Firebase //
  const [allSongs] = AllSongsConfig();
  // Navigation //
  const navigation = useNavigation();
  //filtered Trending Songs //
  const trending = allSongs.filter(track => {
    if (track.tag.includes('trending')) {
      return track;
    }
  });

  let length = 20;
  // Rendering List to flatlist//
  const renderList = ({item}) => {
    return (
      <View style={styles.trackContainer}>
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
          <View style={styles.trackInfoContainer}>
            <View style={styles.singleTrackContainer}>
              <Image source={{uri: item.artwork}} style={styles.artwork} />
              <View>
                <Text style={styles.track}>
                  {item.trackName.length > length
                    ? item.trackName.substring(0, length - 3) + '...'
                    : item.trackName}
                </Text>
                <Text style={styles.artist}>{item.artistName}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.descContainer}>
        <Description title="Trending" size={15} margin={10} />
        <View style={styles.trendingIcon}>
          <Icon name="trending-up-sharp" size={25} color="red" />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={trending}
          renderItem={renderList}
          keyExtractor={item => item.id}
          numColumns={2}
          alwaysBounceVertical={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendingIcon: {
    marginRight: 10,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    marginVertical: 5,
  },
  trackInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  singleTrackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  track: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  artwork: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  artist: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  icon: {
    marginRight: 5,
  },
});
