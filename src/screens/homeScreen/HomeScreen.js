import React, {useEffect, useRef} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDeckListSelector,
  requestingDeckListSelector,
} from 'src/redux/selectors';
import {loadCardDeckList} from 'src/redux/actions';
import {SpinnerType1} from 'src/components';
import {
  HomeTopAppBar,
  HorizontalCardList,
  VerticalCardList,
} from './components';
import {SectionHeader} from '../components';

const RECENTLY = 'Chơi gần đây';
const POPULAR = 'Phổ biến';

export default function HomeScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);

  const {popularData, recentlyData} = cardDeckList;

  useEffect(() => {
    dispatch(loadCardDeckList());
    if (requesting === false) {
      SplashScreen.hide();
    }
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <HomeTopAppBar navigation={navigation} ref={topBarRef} />;
      },
    });
  }, [navigation]);

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ScrollView
        onScroll={topBarRef.current?.onScroll}
        contentContainerStyle={styles.contentContainer}>
        <SectionHeader content={RECENTLY} style={styles.sectionHeader} />
        <HorizontalCardList data={recentlyData} navigation={navigation} />
        <SectionHeader content={POPULAR} style={styles.sectionHeader} />
        <VerticalCardList
          data={popularData}
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
