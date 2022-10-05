import React, {useEffect, useState} from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Platform, ScrollView } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
import axios from 'axios';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Loader } from '../components/Loader';

interface Character {
    id: number;
    name: string;
    hair_color: string;
    skin_color: string;
    birth_year: string;
    eye_color: string;
    vehicles: Array<string>;
    results: any
}

type CharactersList = Character[];
type StackParamList = {
    CharacterDetails: {characterDetails: string}
};

const HomeScreen = () => {
    const [characters, setCharacters] = useState<CharactersList>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isNavigating, setIsNavigating] = useState<boolean>(false);
    const [scroll, setScroll] = useState<number>(0);


    const state = useNavigationState(state => state);
    
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const fetchPeople = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
                if (response.status === 200) {
                    setCharacters(response?.data?.results);
                } else {
                    setError(true);
                }
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    
    const onPageChange = (scrollUp?: number) => {
        if ((isNavigating && state.index) || Platform.OS === 'ios' ? !scrollUp : null) return;
        
        setCurrentPage(currentPage + 1);
    };
 
    useEffect(() => {
        if (currentPage === state.index) return;
            setIsNavigating(false);
            fetchPeople();
    }, [currentPage]);
    

    useEffect(() => {
        if (scroll >= 100) {
            onPageChange();
        }

        setScroll(0);

    }, [scroll])


    const renderItem = ({item}: any) => {
        return (
            <>
            <View style={{flex: 1, flexGrow: 1}}>
                <TouchableOpacity 
                    onPress={() => {setIsNavigating(true); navigation.navigate('CharacterDetails', { characterDetails: JSON.stringify(item)})}} 
                    style={styles.container}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Icon
                            name={Platform.OS === 'ios' ? 'right' : 'chevron-right'}
                            color='#000'
                            type={Platform.OS === 'ios' ? 'antdesign' : 'evillcons'}
                            size={Platform.OS === 'ios' ? 15 : 25}
                            tvParallaxProperties={undefined}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            
            </>
        );
    };

    if (characters.length) {
        return (
            <>
                <StatusBar barStyle="light-content"/>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <Loader />
                    </View>
                )}
                <View>
                    <FlatList 
                        onEndReachedThreshold={0.3}
                        onScroll={(e) => e.nativeEvent.contentOffset.y === 100 ? setScroll(e.nativeEvent.contentOffset.y) : 0}
                        data={characters}
                        keyExtractor={(item: any) => item.name}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => (
                            <View style={styles.separator} />
                        )}
                        onMomentumScrollEnd={(e) => { Platform.OS === 'ios' ? onPageChange(e.nativeEvent.contentOffset.y) : null}}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 100,
                        }}
                    />
                </View>
               
            </>
        );
    };
    
    if (error) {
        return (
            <View style={styles.spinner}>
                <Text style={styles.errorMessage}>Failed to Load Data</Text>
            </View>
        );
    };

    return (
        <View style={styles.spinner}>
            <Loader />
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        padding: 25,
    },
    itemContainer: { 
        flex:1,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,        
    },
    separator: { 
        backgroundColor: "#d3d3d3", 
        height: 1, 
        width: 'auto', 
        marginLeft: 25,
    },
    spinner: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
    },
    loadingContainer: {
        backgroundColor: '#fff', 
        height: Platform.OS === 'ios' ? 400 : 420, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        top: 350,
        position: 'absolute',
        width: 400,
        zIndex: 100,
    },
    errorMessage: {
        fontSize: 18,
        fontWeight: '700',
        color: '#CF2B07',
        marginTop: 10,
    },
   
});
