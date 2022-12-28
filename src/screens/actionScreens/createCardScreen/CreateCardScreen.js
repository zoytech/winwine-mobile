import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton, SpinnerType1} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {defaultOf, HEIGHT, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {
  CreateActionHeader,
  CreateCardTopAppBar,
  RecommendedTaskList,
} from './components';
import {TextInputHolder} from '../createDeckScreen/components';

const width = {
  CONTAINER: 320,
  CARD: 320 * 0.85,
  SEPARATOR: 10,
};
const actions = {
  TASKS: {
    ADD: 'Thêm thử thách',
  },
};

export default function CreateCardScreen({navigation, route}) {
  const {deckTitle, deckId, deckDescription, deckSource, deckTag} =
    route.params;
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const dispatch = useDispatch();
  const [imageHeight, setImageHeight] = useState(HEIGHT?.IMAGE);
  const [taskItem, setTaskItem] = useState(null);
  const [openTaskInput, setOpenTaskInput] = useState(true);

  const scrollViewRef = useRef([]);
  const {cardDeck, tag, uri, tasks} = cardDeckItem || {};
  const recommendedTasks = tasks || [];
  const dataLength = recommendedTasks
    ? recommendedTasks.length
    : defaultOf?.initDataLength;
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const primaryColor = Color.light[ColorVariant.primary]?.base;

  const recommendedDeckId = 1;
  useEffect(() => {
    dispatch(loadCardDeckById(recommendedDeckId));
  }, [dispatch, recommendedDeckId]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CreateCardTopAppBar
          navigation={navigation}
          content={deckTitle}
          source={deckSource}
          ref={scrollViewRef}
          imageHeight={imageHeight}
        />
      ),
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

  function handleOpenTaskInput() {
    setOpenTaskInput(!openTaskInput);
  }

  function renderTaskInput() {
    const borderStyle = {borderBottomColor: primaryColor};
    return (
      <>
        {openTaskInput && (
          <TextInputHolder
            style={borderStyle}
            contentStyle={defaultContentStyle}
            selectTextOnFocus={true}
          />
        )}
      </>
    );
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={scrollViewRef.current.onScroll}>
        <CreateActionHeader
          style={styles.header}
          navigation={navigation}
          cardDeckInfo={{deckTitle, deckTag, deckSource, deckDescription}}
          dataLength={dataLength}
          onLayoutImage={event => handleOnLayoutImage(event)}
        />
        <View style={styles.buttonContainer}>
          <FilledButton
            content={actions.TASKS.ADD}
            onPress={handleOpenTaskInput}
          />
        </View>
        <View style={styles.taskInput}>{renderTaskInput()}</View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH?.SCREEN,
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
  buttonContainer: {
    width: '100%',
    aspectRatio: 7,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  taskInput: {
    width: '80%',
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
