import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GlobalStyles} from '../helpers/color';

export const Description = ({title, size, align, margin}) => {
  return (
    <Text
      style={[
        styles.description,
        {fontSize: size, textAlign: align, marginVertical: margin},
      ]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  description: {
    color: GlobalStyles.colors.primaryText,
    fontFamily: 'Poppins-SemiBold',
  },
});
