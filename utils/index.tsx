import { Platform } from "react-native";

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'ios';

export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};