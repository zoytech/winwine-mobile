import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Color, ColorVariant} from 'src/themes';
import avatarTest from 'src/assets/images/preview-package/user.png';

import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';
import {
  cardDeckListSelector,
  requestingDeckListSelector,
} from 'src/redux/selectors';
import {loadCardDeckList} from 'src/redux/actions';
import {CenterAlignedTopBar, SpinnerType1} from '../../components';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);

  const {suggestData, popularData, recentlyData} = cardDeckList;

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
          content={'Good morning'}
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
        <SectionHeader content={'Recently'} style={styles.sectionHeader} />
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
