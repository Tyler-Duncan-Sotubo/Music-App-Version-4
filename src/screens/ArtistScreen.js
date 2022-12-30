import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AllSongsConfig} from '../hooks/allSongs-config';
import {ImgConfig} from '../hooks/Img-Config';
import {AlbumConfig} from '../hooks/AlbumConfig';
import {GlobalStyles} from '../helpers/color';
import {RenderAlbums} from '../components/RenderAlbums';
import {RenderSongs} from '../components/RenderSongs';
import {PlaylistNavigation} from '../modules/PlaylistNavigation';
import {LoadingAnimation} from '../hooks/LoadingAnimation';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

export const ArtistScreen = ({route, navigation}) => {
  // Data from Firebase //
  const [allSongs] = AllSongsConfig();
  const [albums] = AlbumConfig();
  const [allImgs] = ImgConfig();
  // Props from userArtist//
  const artist = route.params.artist;
  // filtered data from Artiist //
  const data = allSongs.filter(track => {
    if (track.artistName.includes(artist)) {
      return track;
    }
  });
  // filtered first 6 data from Artiist //
  const popularData = data.slice(0, 6);
  // Grab artist Image and filter //
  const image = allImgs.filter(img => {
    if (img.name.includes(artist)) {
      return img;
    }
  });
  // Grab artist album and filter //
  const featuredAlbums = albums.filter(album => {
    if (album[0].artistName.includes(artist)) {
      return album[0];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <PlaylistNavigation name={artist} />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            {image &&
              image.map((item, i) => (
                <View key={i} style={styles.imgContainer}>
                  <Image source={{uri: item.url}} style={styles.image} />
                </View>
              ))}
            <View style={styles.descContainer}>
              <Text style={styles.description}>Popular Songs</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('songs', {
                    data: data,
                  });
                }}>
                <Text style={styles.viewMore}>View all</Text>
              </Pressable>
            </View>
            {popularData &&
              popularData.map((item, i) => (
                <View key={i}>
                  <RenderSongs item={item} />
                </View>
              ))}
          </View>
          <View style={styles.albumsWrapper}>
            {featuredAlbums.length === 0 ? null : (
              <Text style={styles.description}>Albums</Text>
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredAlbums &&
                featuredAlbums.map((item, i) => (
                  <View key={i}>
                    <RenderAlbums
                      item={item}
                      width={150}
                      height={150}
                      flex="column"
                      bottom={10}
                    />
                  </View>
                ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryBg,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
    flex: 1,
  },
  artistName: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 30,
  },
  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewMore: {
    color: GlobalStyles.colors.accentPrimary,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  albumsWrapper: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  description: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  icon: {
    marginVertical: Platform.OS === 'ios' ? 0 : 30,
  },
});
