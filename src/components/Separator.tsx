import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles/styles';


export const Separator = ({marginLeft}: {marginLeft?: number | any}) => {
  return <View style={[styles.separator, {marginLeft: marginLeft}]} />;
};

