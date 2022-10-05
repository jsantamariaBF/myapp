import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Separator = () => {
    return (
        <View style={styles.separator} />
    );
};


const styles = StyleSheet.create({
    separator: { 
        backgroundColor: "#d3d3d3", 
        height: 1, 
        width: 'auto', 
        marginLeft: 15,
    },
});