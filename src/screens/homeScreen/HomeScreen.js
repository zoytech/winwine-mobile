import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Color, ColorVariant} from 'src/themes';
import {
  loadCardDecksFromApi,
  selectCardDeckArray,
  selectGetAllCardDeckRequest,
} from 'src/redux/slices';
import {
  HomeTopAppBar,
  HorizontalCardDecks,
  VerticalCardDecks,
} from './components';
import {CustomStatusBar, SectionHeader} from '../components';
import useRecentlyCardDecks from './useRecentlyCardDecks';
import {Typography} from '../../themes';

const RECENTLY = 'Chơi gần đây';
const POPULAR = 'Phổ biến';
export default function HomeScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const popularCardDecks = useSelector(selectCardDeckArray);
  const rqsCardDecks = useSelector(selectGetAllCardDeckRequest);
  const {recentlyCardDecks = []} = useRecentlyCardDecks();

  useEffect(() => {
    dispatch(loadCardDecksFromApi());
    if (!rqsCardDecks || !popularCardDecks) {
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <ScrollView
        onScroll={topBarRef.current?.onScroll}
        contentContainerStyle={styles.contentContainer}>
        {recentlyCardDecks && recentlyCardDecks.length !== 0 && (
          <>
            <SectionHeader content={RECENTLY} style={styles.sectionHeader} />
            <HorizontalCardDecks
              data={recentlyCardDecks}
              navigation={navigation}
              isLoading={popularCardDecks.length === 0}
            />
          </>
        )}
        <SectionHeader content={POPULAR} style={styles.sectionHeader} />
        <VerticalCardDecks
          data={popularCardDecks}
          navigation={navigation}
          style={styles.secondView}
          isLoading={popularCardDecks.length === 0}
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
  image: {
    width: 65,
    height: 65,
  },
  titleContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
  },
  container2: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});
