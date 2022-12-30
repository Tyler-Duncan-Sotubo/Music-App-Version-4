import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import {SongContext} from '../store/Song-Context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../helpers/color';

export const RenderBookmarkContent = ({
  artist,
  track,
  image,
  lyrics,
  youtubeId,
  id,
  bookmarkedId,
  setIsVisible,
}) => {
  const songCtx = useContext(SongContext);
  const navigation = useNavigation();

  const [date, setDate] = useState(null);
  let today = new Date();
  let now =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  useEffect(() => {
    setDate(now);
  }, [now]);

  const AddToFavorite = () => {
    songCtx.BookMarkSongs(artist, track, image, lyrics, youtubeId, id, date);
    setIsVisible(false);
  };

  return (
    <View>
      <View style={styles.trackInfo}>
        <Image source={{uri: image}} style={styles.artwork} />
        <View>
          {track ? (
            <Text style={styles.track}>
              {track.length > 20 ? track.substring(0, 16) + '...' : track}
            </Text>
          ) : null}
          {artist ? <Text style={styles.artist}>{artist}</Text> : null}
        </View>
        <Pressable
          onPress={() => {
            setIsVisible(false);
          }}>
          <Icon
            name="ios-close-outline"
            size={35}
            color={GlobalStyles.colors.lightGrey}
          />
        </Pressable>
      </View>
      {bookmarkedId === id ? (
        <Pressable
          style={styles.bookmarkText}
          onPress={() => {
            songCtx.removedModal();
            songCtx.removeSong();
            setIsVisible(false);
          }}>
          <Icon
            name="md-heart-outline"
            size={24}
            color={GlobalStyles.colors.lightGrey}
          />
          <Text style={styles.add}>Remove to favorites</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.bookmarkText}
          onPress={() => {
            songCtx.AddedModal();
            AddToFavorite();
          }}>
          <Icon
            name="md-heart-outline"
            size={24}
            color={GlobalStyles.colors.lightGrey}
          />
          <Text style={styles.add}>Add to favorites</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.bookmarkText}
        onPress={() => {
          navigation.pop();
          navigation.navigate('artist', {
            artist: artist,
          });
          setIsVisible(false);
        }}>
        <MaterialIcon
          name="my-library-music"
          size={24}
          color={GlobalStyles.colors.lightGrey}
        />
        <Text style={styles.add}>Go to Artist</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  trackInfoSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artwork: {
    width: 45,
    height: 45,
  },
  track: {
    color: GlobalStyles.colors.lightGrey,
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  artist: {
    color: GlobalStyles.colors.lightGrey,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  add: {
    color: GlobalStyles.colors.lightGrey,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 15,
  },
  bookmarkText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 25,
  },
});
