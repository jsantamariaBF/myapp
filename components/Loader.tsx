import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import { Text } from 'react-native-elements';


export const Loader = () => {
    return (
        <View style={styles.loadingWrapper}>
            <ActivityIndicator size="small" color="#000" />
            <Text style={styles.loading}>Loading</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    separator: { 
        backgroundColor: "#d3d3d3", 
        height: 1, 
        width: 'auto', 
        marginLeft: 15,
    },
    loadingWrapper: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
    },
    loading: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 8,
        fontSize: 18,
        textAlign: 'center', 
        textAlignVertical: 'center',
        color: '#707070', 
        fontWeight: '700',
    },
});
