import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, ColorVariant} from 'src/themes';
import {KEY} from 'src/constants';
import {getItemStorage, getMultiStorage} from 'src/utils';
import {
  cardDecksSelect,
  loadCardDecks,
  recentlyIdsSelect,
  recentlyKeysSelect,
  requestCardDecksSelect,
  selectCardDeckArray,
  selectGetAllCardDeckRequest,
} from 'src/redux/slices';
import {
  HomeTopAppBar,
  HorizontalCardDecks,
  VerticalCardDecks,
} from './components';
import {CustomStatusBar, SectionHeader} from '../components';
import {FilledButton, SpinnerType1} from 'src/components';
import useSelectCardDeckByRecentlyKey from './useSelectCardDeckByRecentlyKey';

const RECENTLY = 'Chơi gần đây';
const POPULAR = 'Phổ biến';
export default function HomeScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const popularCardDecks = useSelector(selectCardDeckArray);
  const rqsCardDecks = useSelector(selectGetAllCardDeckRequest);
  const storeRecentlyKeys = useSelector(recentlyKeysSelect);
  const storedRecentCardDecks = useSelectCardDeckByRecentlyKey() || {};
  const recentlyIds = useSelector(recentlyIdsSelect);
  const recentlyKeys = useSelector(recentlyKeysSelect) || {};
  const [recentlyCardDecks, setRecentlyCardDecks] = useState([]);

  useEffect(() => {
    dispatch(loadCardDecks());
    if (!rqsCardDecks || popularCardDecks === null) {
      SplashScreen.hide();
    } else if (popularCardDecks.length === 0) {
      return <SpinnerType1 />;
    }
  }, [dispatch]);

  useEffect(() => {
    async function getRecentlyCardDecks() {
      if (recentlyKeys.length > 0) {
        const storageRecentlyDecks = await getMultiStorage(recentlyKeys, '');
        console.log('redux key');
        setRecentlyCardDecks(storageRecentlyDecks);
      } else {
        const storageKeys = await getItemStorage(KEY?.RECENTLY_PLAY, []);
        const storageRecentlyDecks = await getMultiStorage(storageKeys, {});
        setRecentlyCardDecks(storageRecentlyDecks);
        console.log('storage');
      }
    }

    if (storedRecentCardDecks.length > 0) {
      setRecentlyCardDecks(storedRecentCardDecks);
      console.log('redux');
    } else {
      getRecentlyCardDecks();
    }
  }, [storeRecentlyKeys]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <HomeTopAppBar navigation={navigation} ref={topBarRef} />;
      },
    });
  }, [navigation]);

  async function handleClearStoragePress() {
    try {
      await AsyncStorage.removeItem(KEY.DECK_COUNT);
    } catch (e) {
      console.log('Clear home storage get error: ', e);
    }
  }

  async function handleClearRecentlyStoragePress() {
    try {
      await AsyncStorage.removeItem(KEY.RECENTLY_PLAY);
    } catch (e) {
      console.log('Clear recently storage get error: ', e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <FilledButton
        content={'clear counter'}
        onPress={handleClearStoragePress}
      />
      <FilledButton
        content={'clear recently'}
        onPress={handleClearRecentlyStoragePress}
      />
      <ScrollView
        onScroll={topBarRef.current?.onScroll}
        contentContainerStyle={styles.contentContainer}>
        {recentlyCardDecks && recentlyCardDecks.length !== 0 && (
          <>
            <SectionHeader content={RECENTLY} style={styles.sectionHeader} />
            <HorizontalCardDecks
              data={recentlyCardDecks}
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
