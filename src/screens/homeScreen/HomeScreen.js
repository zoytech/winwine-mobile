import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDecksSelect,
  loadCardDecks,
  recentlyKeyStoresSelect,
  requestCardDecksSelect,
} from 'src/redux/slices';
import {
  HomeTopAppBar,
  HorizontalCardDecks,
  VerticalCardDecks,
} from './components';
import {CustomStatusBar, SectionHeader} from '../components';
import {FilledButton, SpinnerType1} from 'src/components';
import {KEY} from 'src/constants';

const RECENTLY = 'Chơi gần đây';
const POPULAR = 'Phổ biến';
export default function HomeScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const popularCardDecks = useSelector(cardDecksSelect);
  const requestingCardDecks = useSelector(requestCardDecksSelect);
  const keyStores = useSelector(recentlyKeyStoresSelect);
  const [recentlyCardDeck, setRecentlyCardDeck] = useState([]);
  const [mainKeys, setMainKeys] = useState([]);
  useEffect(() => {
    dispatch(loadCardDecks());
    if (!requestingCardDecks || popularCardDecks === null) {
      SplashScreen.hide();
    } else if (popularCardDecks.length === 0) {
      return <SpinnerType1 />;
    }
  }, [dispatch]);

  useEffect(() => {
    const getMainKeys = async () => {
      try {
        const mainKeyRqs = await AsyncStorage.getItem(KEY.RECENTLY_DECKS);
        const rawKeys = !mainKeyRqs ? [] : JSON.parse(mainKeyRqs);
        setMainKeys(rawKeys);
        const processedKeys = keyStores.length !== 0 ? keyStores : rawKeys;
        const cardDeckRqs = await AsyncStorage.multiGet(processedKeys);
        const retrievedData = [];
        cardDeckRqs.forEach(item => {
          const [keyStore, cardDeck] = item || {};
          cardDeck && retrievedData.push(JSON.parse(cardDeck));
        });
        setRecentlyCardDeck(retrievedData);
      } catch (e) {
        console.log('get main keys error: ', e);
      }
    };
    getMainKeys();
  }, [keyStores]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <HomeTopAppBar navigation={navigation} ref={topBarRef} />;
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <ScrollView
        onScroll={topBarRef.current?.onScroll}
        contentContainerStyle={styles.contentContainer}>
        {recentlyCardDeck && recentlyCardDeck.length !== 0 && (
          <>
            <SectionHeader content={RECENTLY} style={styles.sectionHeader} />
            <HorizontalCardDecks
              data={recentlyCardDeck}
              navigation={navigation}
            />
          </>
        )}
        <SectionHeader content={POPULAR} style={styles.sectionHeader} />
        <VerticalCardDecks
          data={popularCardDecks}
          navigation={navigation}
          style={styles.secondView}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.light[ColorVariant.background].base,
  },
  contentContainer: {
    justifyContent: 'center',
    paddingBottom: 70,
    paddingLeft: 16,
  },
  firstView: {},
  secondView: {
    paddingRight: 16,
  },
  sectionHeader: {
    justifyContent: 'flex-start',
  },
});
