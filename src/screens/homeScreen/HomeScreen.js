import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDecksSelect,
  loadCardDecks,
  requestCardDecksSelect,
  recentlyKeyStoresSelect,
} from 'src/redux/slices';
import {
  HomeTopAppBar,
  HorizontalCardDecks,
  VerticalCardDecks,
} from './components';
import {CustomStatusBar, SectionHeader} from '../components';
import {SpinnerType1} from 'src/components';
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

  /*     '@RECENTLY_PLAY/280c939d-60c4-4d4e-913c-828251e2841a',
                                                    '@RECENTLY_PLAY/04f9962f-a900-4ebd-ad60-f1af749d190b',
                                                                                                             */

  useEffect(() => {
    const getMainKeys = async () => {
      try {
        const mainKeyRqs = await AsyncStorage.getItem(KEY.MAIN);
        console.log('mainKeyRqs: ', mainKeyRqs);
        const mainKey =
          mainKeyRqs && typeof mainKeyRqs === 'object'
            ? JSON.parse(mainKeyRqs)
            : [];
        setMainKeys(mainKey);
        const mainKeyss = keyStores.length !== 0 ? keyStores : mainKeys;
        console.log('mainKeyss: ', mainKeyRqs);
        const cardDeckRqs = await AsyncStorage.multiGet(mainKeyss);
        const retrievedData = cardDeckRqs.map(item => {
          const [keyStore, cardDeck] = item || {};
          return cardDeck != null ? JSON.parse(cardDeck) : null;
        });
        console.log('////////////// ');
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

/*
function renderTitleByTimeSpan() {
  const updatedTime = new Date();
  let currentHr = updatedTime.getHours();
  const MORNING = 6;
  const NOON = 12;
  const EVENING = 18;
  if (currentHr >= MORNING && currentHr <= NOON) {
    return 'Good morning';
  } else if (currentHr >= NOON && currentHr <= EVENING) {
    return 'Good afternoon';
  }
  return 'Good evening';
}
 */

/*


  // useMemo(() => {
  //   setTimeout(() => {
  //     console.log('title: ', title);
  //     if (tillMorning < 0 && tillAfternoon > 0) {
  //       return setTitle('Good morning');
  //     }
  //     if (tillAfternoon < 0 && tillEvening > 0) {
  //       console.log('title: ', title);
  //       return setTitle('Good afternoon');
  //     }
  //     if (tillEvening < 0 || tillMorning > 0) {
  //       return setTitle('Good evening');
  //     }
  //     setTime(updatedTime);
  //   }, DAY_TO_MS);
  // }, [tillAfternoon, tillMorning, tillEvening, updatedTime]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTime(updatedTime);
  //   }, DAY_TO_MS);
  // }, [DAY_TO_MS]);
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     setTitle('Good morning');
  //     setTime(updatedTime);
  //   }, tillMorning);
  // }, [tillMorning]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setTitle('Good afternoon');
  //     setTime(updatedTime);
  //   }, tillAfternoon);
  // }, [tillAfternoon]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setTitle('Good evening');
  //     setTime(updatedTime);
  //   }, tillEvening);
  // }, [tillEvening]);
 */

// const currentTimePoint = updatedTime.valueOf();
// console.log('currentTime: ', currentTimePoint);
// let turnToMorning = updatedTime.setHours(6, 0, 0);
// console.log('morningTime: ', turnToMorning);
// let turnToAfternoon = updatedTime.setHours(12, 0, 0);
// console.log('afternoonTime: ', turnToAfternoon);
// let turnToEvening = updatedTime.setHours(18, 0, 0);
// console.log('eveningTime: ', turnToEvening);
// let morning = turnToMorning - currentTimePoint;
// console.log('tillMorning: ', morning);
// let afternoon = turnToAfternoon - currentTimePoint;
// console.log('tillAfternoon: ', afternoon);
// let evening = turnToEvening - currentTimePoint;
// console.log('tillEvening: ', evening);

// const countTimeToUpdate = () => {
//   if (morning < 0 && afternoon > 0) {
//     console.log('afternoon: ', afternoon);
//     return afternoon;
//   } else if (afternoon < 0 && evening > 0) {
//     console.log('evening: ', evening);
//     return evening;
//   }
//   console.log('morning: ', morning);
//   return morning;
// };

// useEffect(() => {
//   setTimeout(() => {
//     console.log('check');
//     renderTitle(0);
//   }, 1000);
// }, [currentHr]);
