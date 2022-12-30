import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../helpers/color';

export const SearchInput = ({
  placeholder,
  keyboardType,
  value,
  onUpdateValue,
  onPressIn,
  autoCorrect,
  onKeyPress,
}) => {
  return (
    <View>
      <View style={styles.wrapper}>
        <Icon name="search-outline" size={26} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={styles.input}
          onChangeText={onUpdateValue}
          value={value}
          placeholderTextColor={'white'}
          onPressIn={onPressIn}
          autoCorrect={autoCorrect}
          onKeyPress={onKeyPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    marginVertical: 10,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: GlobalStyles.colors.secondaryText,
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Poppins400',
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: GlobalStyles.colors.secondaryText,
  },
  icon: {
    position: 'absolute',
    top: 21,
    left: 20,
  },
});
