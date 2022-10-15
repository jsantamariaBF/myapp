import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';

import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from '../styles/styles';
import {font} from '../styles';
import {capitalize} from '../../utils';

import {Separator} from '../components/Separator';
import {Loader} from '../components/Loader';
import {CustomIcon} from '../components/CustomIcon';

type StackParamList = {
  HomeScreen: any;
};

export const CharacterDetails = ({route}: {route: any}) => {
  const {characterDetails}: any = route.params;
  const character: any = JSON.parse(characterDetails);

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {
    setIsloading(true);
    character.vehicles.forEach(async (url: string) => {
      const res = await axios.get(url);
      setVehicles(prev => [...prev, res.data]);
    });

    setIsloading(false);
  }, []);

  const renderVehicles = ({item}: any) => {
    return (
      <>
        <View style={styles.detailsContainer}>
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
        <View style={styles.detailsContainer}>
          <Text style={styles.informationKey}>Eye Color</Text>
          <Text style={styles.name}>{capitalize(item.eye_color)}</Text>
        </View>
        <Separator />

        <View style={styles.detailsContainer}>
          <Text style={styles.informationKey}>Hair Color</Text>
          <Text style={styles.name}>{capitalize(item.hair_color)}</Text>
        </View>
        <Separator />

        <View style={styles.detailsContainer}>
          <Text style={styles.informationKey}>Skin Color</Text>
          <Text style={styles.name}>{capitalize(item.skin_color)}</Text>
        </View>
        <Separator />

        <View style={styles.detailsContainer}>
          <Text style={styles.informationKey}>Birth Year</Text>
          <Text style={styles.name}>{capitalize(item.birth_year)}</Text>
        </View>
        <Separator />
      </>
    );
  };

  if (!isLoading) {
    return (
      <>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <CustomIcon
              name="arrowleft"
              color="white"
              type="antdesign"
              onPress={() => navigation.navigate('HomeScreen')}
              size={font.xxl}
              tvParallaxProperties={undefined}
              style={styles.icon}
            />
          </View>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{character.name}</Text>
          </View>
        </SafeAreaView>
        <View style={styles.flatListContainer}>
          <FlatList data={[character]} renderItem={renderInformation} />
        </View>
        {vehicles.length > 0 ? (
          <>
            <View style={styles.vehiclesContainer}>
              <Text style={styles.sectionLabel}>Vehicles</Text>
            </View>
            <FlatList
              data={vehicles}
              keyExtractor={(item: any) => item?.name}
              renderItem={renderVehicles}
            />
          </>
        ) : (
          <View style={styles.vehiclesContainer}>
            <Text style={styles.sectionLabel}>Vehicles</Text>
            <Text style={styles.noVehiclesMessage}>
              This character does not have a vehicle
            </Text>
          </View>
        )}
      </>
    );
  }
  return (
    <View style={styles.spinner2}>
      <Loader size='small' text='Loading'/>
    </View>
  );
};
