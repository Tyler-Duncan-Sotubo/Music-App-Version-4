import {StyleSheet, View, SafeAreaView, ScrollView, Image} from 'react-native';
import React from 'react';
import {RenderSongs} from '../components/RenderSongs';
import {GlobalStyles} from '../helpers/color';
import {PlaylistNavigation} from '../modules/PlaylistNavigation';
import {sortArray} from '../hooks/sortArray';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

export const ChartScreen = ({route}) => {
  // Params from Homepage ChartData//
  const chartData = route.params.chart;
  // Sort by Name function //
  const [sort_by] = sortArray();
  const chart = chartData.sort(sort_by('album', false, a => a.toUpperCase()));

  return (
    <SafeAreaView style={styles.safeArea}>
      <PlaylistNavigation name="Top 20 Songs Of The Week " />
      <View style={styles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://tooxclusive.com/wp-content/uploads/2022/09/Top20.png',
              }}
              style={styles.featuredImg}
            />
          </View>
          {chart.map((item, i) => {
            let number = i + 1;
            return (
              <View key={i}>
                <RenderSongs item={item} position={number} />
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    flex: 1,
    marginBottom: 30,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  featuredImg: {
    width: 220,
    height: 210,
  },
  description: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
