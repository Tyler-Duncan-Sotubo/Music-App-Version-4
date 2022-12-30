import React from 'react';
import {StyleSheet, Text, Pressable, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles} from '../helpers/color';

export const PlaylistNavigation = ({name}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialIcon
          name="arrow-back-ios"
          size={18}
          color={GlobalStyles.colors.primaryText}
          style={styles.icon}
        />
      </Pressable>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  icon: {
    marginRight: 10,
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  title: {
    color: GlobalStyles.colors.primaryText,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    marginRight: 10,
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
