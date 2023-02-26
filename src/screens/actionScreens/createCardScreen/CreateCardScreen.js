import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Field, Formik} from 'formik';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton} from 'src/components';
import {HEIGHT, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {CreateCardTopAppBar} from './components';
import {TextInputHolder} from '../components';
import {CardApi} from 'src/apis';

const width = {
  CONTAINER: 320,
  CARD: 320 * 0.85,
  SEPARATOR: 10,
};

export default function CreateCardScreen({navigation, route}) {
  const {
    cardDeckIdParam,
    cardDeckNameParam,
    cardDeckImageParam,
    cardDeckDescriptionParam,
    hashtagsParam,
  } = route.params;
  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };
  const [imageHeight, setImageHeight] = useState(HEIGHT?.IMAGE);
  const submittingValues = [];

  const scrollViewRef = useRef([]);
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const primaryColor = Color.light[ColorVariant.primary]?.base;

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CreateCardTopAppBar
          navigation={navigation}
          content={cardDeckNameParam}
          source={cardDeckImageParam}
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

  async function onSubmitPress(values, actions) {
    const processedCardInfo = {...values};
    submittingValues.push(processedCardInfo);
    const config = {
      body: submittingValues,
    };
    try {
      const response = await CardApi.postCardByCardDeckId(
        cardDeckIdParam,
        config,
      );
      console.log('response: ', response);
      // if (response) {
      //   await actions.setSubmitting(false);
      // }
    } catch (e) {
      console.log('Fail to create card: ', e);
    }
  }

  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <Formik initialValues={initialValues} onSubmit={onSubmitPress}>
        {({handleSubmit, isValid}) => (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            onScroll={scrollViewRef.current.onScroll}>
            <View style={styles.taskInput}>
              <Field component={TextInputHolder} name={'cardTitle'} />
            </View>
            <View style={styles.buttonContainer}>
              <FilledButton content={'Tiếp'} onPress={handleSubmit} />
              <FilledButton content={'Tạo bộ bài'} onPress={handleSubmit} />
            </View>
          </ScrollView>
        )}
      </Formik>
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
    // aspectRatio: ,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 200,
  },
  taskInput: {
    width: '80%',
    aspectRatio: 0.9,
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

/*
<RecommendedTaskList
    data={recommendedTasks}
    style={styles.card}
    onItemPress={handleCardItemPressed}
    contentStyle={defaultContentStyle}
/>
*/
