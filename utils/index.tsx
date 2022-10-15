import { Platform } from "react-native";

// mobile validation
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// utils functions
export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};