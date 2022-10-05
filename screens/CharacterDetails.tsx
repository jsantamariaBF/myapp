import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform} from 'react-native'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {capitalize} from '../utils';

import { Separator } from '../components/Separator';
import { Loader } from '../components/Loader';

type StackParamList = {
    HomeScreen: any
};

const CharacterDetails = ({route}: {route: any}) => {
    const { characterDetails }: any = route.params;
    const character: any = JSON.parse(characterDetails);

    const [vehicles, setVehicles] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);

    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    
    useEffect(() => {
        setIsloading(true);

        character.vehicles.forEach(async (url: string) => {
            const res = await axios.get(url);
            setVehicles((prev) => [...prev, res.data]);
        });

        setIsloading(false);
    }, []);

    const renderVehicles = ({item}: any) => {
        return (
            <>  
                <View style={styles.container}>
                    <Text style={styles.informationKey}>{item?.name}</Text>
                </View>
                <Separator />
            </>
        );
    };

    const renderInformation = ({item}: any) => {
        return (
            <>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionLabel}>General Information</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.informationKey}>Eye Color</Text>
                    <Text style={styles.name}>{capitalize(item.eye_color)}</Text>
                </View>
                <Separator />

                <View style={styles.container}>
                    <Text style={styles.informationKey}>Hair Color</Text>
                    <Text style={styles.name}>{capitalize(item.hair_color)}</Text>
                </View>
                <Separator />

                <View style={styles.container}>
                    <Text style={styles.informationKey}>Skin Color</Text>
                    <Text style={styles.name}>{capitalize(item.skin_color)}</Text>
                </View>
                <Separator />

                <View style={styles.container}>
                    <Text style={styles.informationKey}>Birth Year</Text>
                    <Text style={styles.name}>{capitalize(item.birth_year)}</Text>
                </View>
                <Separator />
            </>
        );
    };

    if(!isLoading) {
        return (
            <>
                <SafeAreaView style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name="arrowleft"
                            color='white'
                            type="antdesign"
                            size={25}
                            tvParallaxProperties={undefined}
                            onPress={() => navigation.navigate('HomeScreen')}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.characterNameContainer}>
                        <Text style={styles.characterName}>{character.name}</Text>
                    </View>
                </SafeAreaView>
                <View style={styles.flatListContainer}>
                    <FlatList 
                        data={[character]}
                        renderItem={renderInformation}
                    />
                </View>
                {vehicles.length > 0 
                    ? <>
                        <View style={styles.vehiclesContainer}>
                            <Text style={styles.sectionLabel}>Vehicles</Text>
                        </View> 
                        <FlatList 
                            data={vehicles}
                            keyExtractor={(item: any) => item?.name}
                            renderItem={renderVehicles}
                        />
                    </>
                    :(
                        <View style={styles.vehiclesContainer}>
                            <Text style={styles.sectionLabel}>Vehicles</Text>
                            <Text style={styles.noVehiclesMessage}>This character does not have a vehicle</Text>
                        </View>
                    )
                }
            </>
      );
    }
    return (
        <View style={styles.spinner}>
            <Loader />
        </View>
    );
};

export default CharacterDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    headerContainer: {
        backgroundColor: '#000', 
        flexDirection: 'row',
        paddingVertical: Platform.OS === 'ios' ? 0 : 15,
    },
    flatListContainer: {
        flex: 0, 
        marginBottom: 40
    },
    characterNameContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    sectionContainer: {
        padding: 15,
        marginTop: 20,
    },
    vehiclesContainer: {
        padding: 15,
    },
    loadingContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    iconContainer: {
        marginLeft: Platform.OS === 'ios' ? 0 : 15,
    },
    characterName: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: '700',
        marginRight: 40,
    },
    informationKey: {
        color: '#707070',
        fontWeight: '700',
        fontSize: 18,
    },
    sectionLabel: {
        fontWeight: '700',
        fontSize: 18,
        color: '#000'
    },
    name: {
        fontWeight: '700',
        fontSize: 18,        
    },
    noVehiclesMessage: {
        textAlign: 'left', 
        paddingVertical: 20, 
        fontSize: 18, 
        fontWeight: '700', 
        color: '#707070' 
    },
    loading: {
        marginLeft: 5, 
        fontSize: 18
    },
    spinner: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    icon: {
        padding: 10,
    },

});