import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import {GlobalStyles} from '../helpers/color';
import {SearchNavigation} from '../modules/SearchNavigation';
import firestore from '@react-native-firebase/firestore';
import {LoadingAnimation} from '../hooks/LoadingAnimation';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

const AlbumScreen = ({route, navigation}) => {
  // Props from Individual Albums//
  const itemId = route.params.itemId;
  const featuredImg = route.params.featuredImg;
  const albumName = route.params.albumName;
  const artistName = route.params.artistName;
  // Database Returns Lyrics for Each Album by ID //
  const [lyrics, setLyrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    let snapshot = await firestore()
      .collection('Albums')
      .doc(itemId)
      .collection('songs')
      .get()
      .then(querySnapshot => {
        let completeLyrics = [];
        querySnapshot.forEach(lyrics => {
          completeLyrics.push({id: lyrics.id, ...lyrics.data()});
        });
        setLyrics([...completeLyrics]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <View style={styles.container}>
            <SearchNavigation />
            <View style={styles.imageContainer}>
              <Image
                source={{uri: featuredImg}}
                style={styles.featuredArtwork}
              />
              <View>
                <Text style={styles.albumCount}>{lyrics.length} Tracks </Text>
                <Text style={styles.album}>{albumName}</Text>
                <Text style={styles.artist}>{artistName}</Text>
              </View>
            </View>
            {lyrics.map((item, i) => {
              let number = i + 1;
              return (
                <View key={i}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Track', {
                        itemId: itemId,
                        youtubeId: item[0].youtube,
                        lyrics: item[0].lyrics,
                        image: featuredImg,
                        track: item[0].trackName,
                        artist: artistName,
                      });
                    }}
                    style={styles.wrapper}>
                    <View style={styles.trackInfo}>
                      <View style={styles.trackInfo}>
                        <View>
                          <Text style={styles.number}>{number}</Text>
                        </View>
                        <View>
                          <Text style={styles.track}>{item[0].trackName}</Text>
                          <Text style={styles.artist}>{artistName}</Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.duration}>{item[0].duration}</Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
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

export default AlbumScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryBg,
  },
  container: {
    padding: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  wrapper: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  featuredArtwork: {
    width: 140,
    height: 140,
    marginRight: 15,
  },
  number: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
    marginHorizontal: 5,
    width: 20,
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  album: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginVertical: 3,
  },
  track: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
  artist: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  duration: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 14,
    fontFamily: 'Poppins600',
    textTransform: 'capitalize',
  },
  albumCount: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 15,
    fontFamily: 'Poppins600',
    textTransform: 'uppercase',
  },
});
