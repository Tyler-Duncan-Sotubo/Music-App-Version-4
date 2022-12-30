import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {NavWithSearch} from '../modules/NavWithSearch';
import {GlobalStyles} from '../helpers/color';
import {RenderSongs} from '../components/RenderSongs';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

export const ArtistSongsScreen = ({route}) => {
  // data from artist //
  const data = route.params.data;
  // Flitered Data //
  const [loadedData, setLoadedData] = useState(data);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavWithSearch
          description="All Songs"
          data={data}
          setLoadedData={setLoadedData}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {loadedData &&
            loadedData.map((item, i) => (
              <View key={i}>
                <RenderSongs item={item} />
              </View>
            ))}
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
    marginVertical: 20,
    flex: 1,
  },
});
