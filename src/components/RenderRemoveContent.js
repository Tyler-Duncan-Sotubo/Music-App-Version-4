import React, {useContext} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {SongContext} from '../store/Song-Context';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../helpers/color';

export const RenderRemoveContent = ({id, setIsVisible, artist}) => {
  const songCtx = useContext(SongContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.bookmarkText}
          onPress={() => {
            songCtx.removeSong(id);
            setIsVisible(false);
          }}>
          <MaterialIcon
            name="delete-forever"
            size={24}
            color={GlobalStyles.colors.primaryBg}
          />
          <Text style={styles.add}>Remove to favorites</Text>
        </Pressable>
        <Pressable
          style={styles.bookmarkText}
          onPress={() => {
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
      <Pressable
        style={styles.close}
        onPress={() => {
          setIsVisible(false);
        }}>
        <Icon
          name="ios-close-outline"
          size={40}
          color={GlobalStyles.colors.primaryBg}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookmarkText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    marginLeft: 15,
  },
  add: {
    color: GlobalStyles.colors.primaryBg,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 15,
  },
  close: {
    marginRight: 15,
  },
});
