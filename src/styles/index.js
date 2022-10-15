import {StyleSheet} from 'react-native';

export const font = StyleSheet.create({
  null: 0,
  extraSmall: 5,
  small: 12,
  medium: 15,
  large: 18,
  xl: 22,
  xxl: 25,
  xxxl: 28,
});

export const weight = StyleSheet.create({
  normal: '400',
  bold: '700',
  extraBold: '900',
});


export const align = StyleSheet.create({
  left: 'center',
  right: 'right',
  center: 'center',
  top: 'top',
  bottom: 'bottom',
  flexBetween: 'space-between',
  flexStart: 'flex-start',
  flexColumnReverse: 'column-reverse',
  flexRow: 'row',
  flexColumn: 'column',
});

export const position = StyleSheet.create({
  absolute: 'absolute',
  relative: 'relative',
});

export const palette = StyleSheet.create({
  white: '#FFFFFF',
  black: '#000000',
  gray: '#707070',
  red: '#CF2B07',
  separatorColor: '#d3d3d3',
});


export const sizes = StyleSheet.create({
  null: 0,
  extraSmall: 5,
  small: 10,
  medium: 15,
  extraMedium: 20,
  large: 25,
  extraLarge: 30,
  xl: 35,
  xxl: 40,
  xxxl: 45,
  hundred: 100,
  auto: 'auto',
});
