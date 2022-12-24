import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {defaultOf, heightOf, widthOf} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {
  CreateActionHeader,
  CreateCardTopAppBar,
  RecommendedTaskList,
} from './components';

const width = {
  CONTAINER: 320,
  CARD: 320 * 0.85,
  SEPARATOR: 10,
};

export default function CreateCardScreen({navigation, route}) {
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const dispatch = useDispatch();
  const [imageHeight, setImageHeight] = useState(heightOf?.IMAGE);
  const {cardDeck, tag, uri, tasks} = cardDeckItem || {};
  const recommendedTasks = tasks || [];
  const dataLength = recommendedTasks
    ? recommendedTasks.length
    : defaultOf?.initDataLength;
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const recommendedDeckId = 1;
  useEffect(() => {
    dispatch(loadCardDeckById(recommendedDeckId));
  }, [dispatch, recommendedDeckId]);

  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateCardTopAppBar navigation={navigation} />,
    });
  }, [navigation, imageHeight]);

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];

  function handleOnLayoutImage(event) {
    setImageHeight(event.nativeEvent.layout.height);
  }

  function handleCardItemPressed() {
    console.log('some action here');
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <CreateActionHeader
        style={styles.header}
        navigation={navigation}
        cardDeckInfo={{cardDeck, tag, uri}}
        dataLength={dataLength}
        onLayoutImage={event => handleOnLayoutImage(event)}
      />
      <View style={styles.supportingText}>
        <Text style={defaultContentStyle}>
          {'goi y cac thu thach tham khao'}
        </Text>
      </View>
      <RecommendedTaskList
        data={recommendedTasks}
        style={styles.card}
        onItemPress={handleCardItemPressed}
        contentStyle={defaultContentStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthOf?.SCREEN,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    aspectRatio: 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    paddingVertical: 16,
    paddingBottom: 48,
  },
  suggestingDeck: {
    width: '100%',
    aspectRatio: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
  },
  buttonContent: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  headerButtonIcon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
});
