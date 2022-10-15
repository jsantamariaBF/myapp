import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-elements';
import {styles} from '../styles';

export const Loader = ({size, text}: {size: number | any, text: string}) => {
  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size={size}  />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};
