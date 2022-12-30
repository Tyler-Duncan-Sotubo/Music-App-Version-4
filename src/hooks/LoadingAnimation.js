import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export const LoadingAnimation = () => {
  const [color, setColor] = useState('teal');
  useEffect(() => {
    const id = setInterval(() => {
      setColor(color => (color === 'teal' ? 'royalblue' : 'teal'));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" color={color} style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  indicator: {
    marginTop: 300,
  },
});
