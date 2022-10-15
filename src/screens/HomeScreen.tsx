import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from '../styles';
import { sizes } from '../styles/sizes';
import { isIOS } from '../../utils';

import {Loader} from '../components/Loader';
import { CustomIcon } from '../components/CustomIcon';


interface Character {
  id: number;
  name: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  eye_color: string;
  vehicles: Array<string>;
  results: any;
}

type CharactersList = Character[];
type StackParamList = {
  CharacterDetails: {characterDetails: string};
};

export const HomeScreen = () => {
  const [characters, setCharacters] = useState<CharactersList>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const state = useNavigationState(status => status);

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPage}`,
      );
      if (response.status === 200) {
        setCharacters(response?.data?.results);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const onPageChange = (scrollUp?: number) => {
    if (
      (isNavigating && state.index) ||
      (isIOS && scrollUp === 0)
    ) {
      return;
    }

    return setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage === state.index) {
      return;
    }
    setIsNavigating(false);
    fetchPeople();
  }, [currentPage]);

  useEffect(() => {
    if (scroll >= 100) {
      onPageChange();
    }

    setScroll(0);
  }, [scroll]);

  const renderItem = ({item}: any) => {
    return (
      <>
        <View style={styles.homeContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsNavigating(true);
              navigation.navigate('CharacterDetails', {
                characterDetails: JSON.stringify(item),
              });
            }}
            style={styles.container}>
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <CustomIcon 
                name={isIOS ? 'right' : 'chevron-right'}
                type={isIOS ? 'antdesign' : 'evillcons'}
                size={isIOS ? sizes.medium : sizes.large}
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
        <StatusBar barStyle="light-content" />
        {loading && (
          <View style={styles.loadingContainer}>
            <Loader size='small' text='Loading' />
          </View>
        )}
        <View>
          <FlatList
            onEndReachedThreshold={0.3}
            onScroll={e =>
              e.nativeEvent.contentOffset.y === 100
                ? setScroll(e.nativeEvent.contentOffset.y)
                : 0
            }
            data={characters}
            keyExtractor={(item: any) => item.name}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onMomentumScrollEnd={e => { isIOS ? onPageChange(e.nativeEvent.contentOffset.y) : null; }}
            contentContainerStyle={styles.characterList}
          />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <View style={styles.spinner}>
        <Text style={styles.errorMessage}>Failed to Load Data</Text>
      </View>
    );
  }

  return (
    <View style={styles.spinner}>
      <Loader size='small' text='Loading' />
    </View>
  );
};
