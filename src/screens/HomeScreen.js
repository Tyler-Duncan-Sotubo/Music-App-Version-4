import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Pressable,
} from 'react-native';
import {GlobalStyles} from '../helpers/color';
import {TrendingSongs} from '../components/TrendingSongs';
import {NewRelease} from '../components/NewRelease';
import {FeaturedArtist} from '../components/FeaturedArtist';
import {Chart} from '../components/Chart';
import {FeaturedAlbums} from '../components/FeaturedAlbums';
import {LoadingAnimation} from '../hooks/LoadingAnimation';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

export const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              <TrendingSongs />
              <FeaturedArtist />
              <NewRelease />
              <Chart />
              <FeaturedAlbums />
              <Pressable
                onPress={() => {
                  navigation.navigate('player');
                }}>
                <Text>Player</Text>
              </Pressable>
            </>
          )}
        </View>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryBg,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'none',
  },
  BannerAd: {
    position: 'absolute',
  },
});
