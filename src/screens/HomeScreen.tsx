import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from '../styles/styles';
import { sizes } from '../styles';
import { isAndroid, isIOS } from '../../utils';

import {Loader} from '../components/Loader';
import { CustomIcon } from '../components/CustomIcon';

import { peopleAPI, planetsAPI, speciesAPI } from '../apis';

// set prop type to useNavigation
type StackParamList = {
  CharacterDetails: {characterDetails: string};
};
  
export const HomeScreen = () => {
  const [characters, setCharacters] = useState<Array<any>>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const flatListRef = useRef<any>();

  const state = useNavigationState(status => status);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const fetchPeople = async() => {
    setLoading(true);
    try {
      const response: Array<any> = await Promise.all([peopleAPI(currentPage), planetsAPI(currentPage), speciesAPI(currentPage)])
      const [characterData, planetData, specieData] = response; 

        const combined = characterData?.data?.results.map((item: any, index: number) => {
          return {...item, name: item?.name, planetName: planetData?.data?.results[index]?.name, specieName: specieData?.data?.results[index]?.name}
        });

        setCharacters(combined)

    } catch (err) {
      setError(true);
    } finally {
      flatListRef?.current.scrollToOffset({animated: true, offset: 0})
      setLoading(false);
    }
  };

  const fetchMoreData = (scrollUp?: number) => {
    // disabling fetchMoreData when user navigate or scroll up
    if ((isNavigating && state.index) || scrollUp === 0) {
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
    console.log(scroll);
    
    if (isAndroid && scroll >= 290) {
      fetchMoreData();
    }

    return setScroll(0);
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
              <View style={styles.column}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.row}>
                  <Text style={styles.subtitle}>{item.specieName} from </Text>
                  <Text style={styles.subtitle}>{item.planetName}</Text>
                </View>
              </View>
              <CustomIcon 
                name={isIOS ? 'right' : 'chevron-right'}
                type={isIOS ? 'antdesign' : 'evillcons'}
                size={isIOS ? sizes.medium : sizes.large}
                tvParallaxProperties={undefined} 
                style={styles.characterNameContainer}
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
            ref={flatListRef}
            onEndReachedThreshold={0.3}
            onScroll={e => setScroll(e.nativeEvent.contentOffset.y)}
            data={characters}
            keyExtractor={(item: any) => item.name}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onMomentumScrollEnd={e => { isIOS ? fetchMoreData(e.nativeEvent.contentOffset.y) : null }}
            contentContainerStyle={styles.characterList}
          />
        </View>
      </>
    );
  } else if (error) {
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
