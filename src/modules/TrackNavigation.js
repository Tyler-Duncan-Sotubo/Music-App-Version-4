import React from 'react';
import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles} from '../helpers/color';

export const TrackNavigation = ({setIsVisible, track}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialIcon
          name="keyboard-arrow-down"
          size={30}
          color={GlobalStyles.colors.iconColor}
          style={styles.icon}
        />
      </Pressable>
      <Text style={styles.title}>
        {track.length > 20 ? track.substring(0, 20) + '...' : track}
      </Text>
      <Pressable
        onPress={() => {
          setIsVisible(true);
        }}>
        <View style={styles.viewCount}>
          <MaterialIcon
            name="more-horiz"
            size={20}
            color={GlobalStyles.colors.iconColor}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  viewCount: {
    width: 28,
    height: 28,
    backgroundColor: GlobalStyles.colors.secondaryText,
    borderRadius: 28 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
