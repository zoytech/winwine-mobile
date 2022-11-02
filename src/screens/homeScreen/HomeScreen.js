import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDeckListSelector,
  requestingDeckListSelector,
} from 'src/redux/selectors';
import {loadCardDeckList} from 'src/redux/actions';
import {CenterAlignedTopBar, SpinnerType1} from 'src/components';
import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';
import avatarTest from 'src/assets/images/preview-package/user.png';
import {DAY_TO_MS} from 'src/constants';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);

  const {suggestData, popularData, recentlyData} = cardDeckList;

  const updatedTime = new Date();
  const [time, setTime] = useState(updatedTime);
  const [title, setTitle] = useState('');
  const currentTime = time.valueOf();
  console.log('currentTime: ', currentTime);
  let morningTime = time.setHours(6, 0, 0).valueOf();
  console.log('morningTime: ', morningTime);
  let afternoonTime = time.setHours(12, 0, 0).valueOf();
  console.log('afternoonTime: ', afternoonTime);
  let eveningTime = time.setHours(18, 0, 0).valueOf();
  console.log('eveningTime: ', eveningTime);
  let tillMorning = morningTime - currentTime;
  console.log('tillMorning: ', tillMorning);
  let tillAfternoon = afternoonTime - currentTime;
  console.log('tillAfternoon: ', tillAfternoon);
  let tillEvening = eveningTime - currentTime;
  console.log('tillEvening: ', tillEvening);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setTime(updatedTime);
    }, DAY_TO_MS);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setTitle('Good morning');
    }, tillMorning);
    return () => clearTimeout(timerId);
  }, [tillMorning]);
  useEffect(() => {
    let timerId = setTimeout(() => {
      setTitle('Good afternoon');
    }, tillAfternoon);
    return () => clearTimeout(timerId);
  }, [tillAfternoon]);
  useEffect(() => {
    let timerId = setTimeout(() => {
      setTitle('Good evening');
    }, tillEvening);
    return () => clearTimeout(timerId);
  }, [tillEvening]);

  useEffect(() => {
    dispatch(loadCardDeckList());
    if (requesting === false) {
      SplashScreen.hide();
    }
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CenterAlignedTopBar
          content={title}
          headerTitleStyle={styles.headerTitle}
          trailingIcon={avatarTest}
          onTrailingIconPress={() => alert('test leading button')}
        />
      ),
    });
  }, [navigation]);

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SuggestionList data={suggestData} navigation={navigation} />
        <SectionHeader
          content={'Recently'}
          style={styles.sectionHeader}
          onPress={() => alert('close')}
        />
        <HorizontalCardList data={recentlyData} navigation={navigation} />
        <SectionHeader content={'Popular'} style={styles.sectionHeader} />
        <VerticalCardList data={popularData} navigation={navigation} />
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
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sectionHeader: {
    justifyContent: 'flex-start',
  },
  headerTitle: {
    justifyContent: 'flex-start',
  },
});
