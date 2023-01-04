import React, {useEffect, useRef} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDecksSelect,
  loadCardDecks,
  requestCardDecksSelect,
} from 'src/redux/slices';
import {HomeTopAppBar, VerticalCardDecks} from './components';
import {CustomStatusBar} from '../components';
import {SpinnerType1} from 'src/components';

export default function HomeScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const popularCardDecks = useSelector(cardDecksSelect);
  const requestingCardDecks = useSelector(requestCardDecksSelect);
  useEffect(() => {
    dispatch(loadCardDecks());
    if (!requestingCardDecks || popularCardDecks === null) {
      SplashScreen.hide();
    } else if (popularCardDecks.length === 0) {
      return <SpinnerType1 />;
    }
  }, [dispatch]);

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
