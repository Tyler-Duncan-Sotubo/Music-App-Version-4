import {StyleSheet, Platform, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../helpers/color';

export const SearchNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.icon}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          name="chevron-back"
          size={24}
          color={GlobalStyles.colors.iconColor}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('search');
        }}>
        <Icon
          name="search-outline"
          size={24}
          color={GlobalStyles.colors.iconColor}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
});
