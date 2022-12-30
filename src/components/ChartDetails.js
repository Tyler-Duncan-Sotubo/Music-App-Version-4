import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../helpers/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const ChartDetails = ({item, position}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
        <View style={styles.trackInfo}>
          <Text style={styles.position}>{position}</Text>
          <Image source={{uri: item.artwork}} style={styles.artwork} />
          <View>
            <Text style={styles.track}>{item.trackName}</Text>
            <Text style={styles.artist}>{item.artistName}</Text>
          </View>
        </View>
      </Pressable>
      <MaterialIcon
        name="more-horiz"
        size={24}
        color={GlobalStyles.colors.primaryText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 10,
    width: 20,
  },
  artist: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
  },
  artwork: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  track: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
});
