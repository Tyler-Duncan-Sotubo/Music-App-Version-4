/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {TrackNavigation} from '../modules/TrackNavigation';
import {GlobalStyles} from '../helpers/color';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import RenderLyrics from '../components/RenderLyrics';
import {SongContext} from '../store/Song-Context';
import {RenderBookmarkContent} from '../components/RenderBookmarkContent';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

export const TrackScreen = ({route}) => {
  //Track params//
  const youtubeId = route.params.youtubeId;
  const lyrics = route.params.lyrics;
  const artist = route.params.artist;
  const track = route.params.track;
  const image = route.params.image;
  const itemId = route.params.itemId;

  const [isvisible, setIsVisible] = useState(false);
  const songCtx = useContext(SongContext);
  const [bookmarkedId, setBookmarkedId] = useState('');

  const checkId = id => {
    songCtx.markSongs.map(item => {
      if (item.id === id) {
        setBookmarkedId(id);
      }
    });
  };

  useEffect(() => {
    checkId(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songCtx.markSongs]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Image
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.1,
            position: 'absolute',
            zIndex: -1,
          }}
          source={{uri: image}}
        />
        <View style={styles.container}>
          <TrackNavigation setIsVisible={setIsVisible} track={track} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.lyricsContainer}>
            <View style={styles.banner}>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View>
            <RenderLyrics lyrics={lyrics} />
          </ScrollView>
          <Modal animationType="slide" transparent visible={isvisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalWrapper}>
                <RenderBookmarkContent
                  youtubeId={youtubeId}
                  lyrics={lyrics}
                  artist={artist}
                  track={track}
                  image={image}
                  id={itemId}
                  bookmarkedId={bookmarkedId}
                  setIsVisible={setIsVisible}
                />
              </View>
            </View>
          </Modal>
        </View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryBg,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 25,
    flex: 1,
  },
  lyricsContainer: {
    marginVertical: 5,
  },
  track: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins600',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    height: '32%',
    width: '100%',
    backgroundColor: GlobalStyles.colors.iconColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  banner: {
    alignItems: 'center',
    marginTop: 15,
  },
});
