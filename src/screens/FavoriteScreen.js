import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SongContext} from '../store/Song-Context';
import {Description} from '../modules/Description';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../helpers/color';
import {RenderRemoveContent} from '../components/RenderRemoveContent';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1115876871453816/2965842676';

export const FavoriteScreen = ({navigation}) => {
  // Context Varible //
  const songCtx = useContext(SongContext);
  // Toggling State//
  const [isvisible, setIsVisible] = useState(false);
  const [songId, setSongId] = useState('');
  const [artist, setArtist] = useState('');
  // generate Date and time //
  let today = new Date();
  let now =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  let length = 17;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {songCtx.markSongs.length === 0 ? (
          <View style={styles.preFavorite}>
            <Icon
              name="musical-notes"
              size={30}
              color={GlobalStyles.colors.accentPrimary}
            />
            <Text style={styles.favorite}>
              Start Adding Your Favorites Lyrics and Songs
            </Text>
            <Text style={styles.favorite}>Click the favorite button</Text>
          </View>
        ) : (
          <Description title="Favorites Lyrics" size={16} align="center" />
        )}
        <ScrollView>
          {songCtx.markSongs.map((item, i) => (
            <View key={i} style={styles.wrapper}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Track', {
                    artist: item.artist,
                    track: item.track,
                    youtubeId: item.youtubeId,
                    itemId: item.id,
                    lyrics: item.lyrics,
                    image: item.image,
                  });
                }}>
                <View style={styles.imageWrapper}>
                  <Image source={{uri: item.image}} style={styles.artwork} />
                  <View>
                    <Text style={styles.track}>
                      {item.track.length > length
                        ? item.track.trimStart().substring(0, length - 3) +
                          '...'
                        : item.track.trimStart()}
                    </Text>
                    <Text style={styles.artist}>{item.artist}</Text>
                  </View>
                </View>
              </Pressable>
              <View>
                {item.date === now ? (
                  <Text style={styles.date}>Today</Text>
                ) : (
                  <Text style={styles.date}>{item.date}</Text>
                )}
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    setIsVisible(true);
                    setSongId(item.id);
                    setArtist(item.artist);
                  }}>
                  <MaterialIcon
                    name="more-horiz"
                    size={24}
                    color={GlobalStyles.colors.iconColor}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal animationType="slide" transparent visible={isvisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalWrapper}>
              <RenderRemoveContent
                id={songId}
                setIsVisible={setIsVisible}
                artist={artist}
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryBg,
  },
  container: {
    padding: 10,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 20,
  },
  preFavorite: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '50%',
  },
  wrapper: {
    marginHorizontal: 10,
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 200,
  },
  artist: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  track: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 13,
    fontFamily: 'Poppins-Meduim',
  },
  artwork: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderRadius: 5,
  },
  image: {
    width: 20,
    height: 25,
    resizeMode: 'contain',
  },
  favorite: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  date: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    height: '25%',
    width: '100%',
    backgroundColor: GlobalStyles.colors.iconColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
