import React from 'react';
import {Icon} from 'react-native-elements';

export const CustomIcon = ({
  onPress,
  type,
  name,
  color,
  size,
  tvParallaxProperties,
  style,
}: {
  onPress?: any;
  type: string;
  color?: string;
  name: string;
  size: number | any;
  tvParallaxProperties?: any;
  style?: object;
}) => {
  return (
    <Icon
      tvParallaxProperties={tvParallaxProperties}
      name={name}
      color={color}
      type={type}
      size={size}
      onPress={onPress}
      style={style}
    />
  );
};
