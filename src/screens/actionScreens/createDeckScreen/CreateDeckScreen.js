import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1, TonalButton} from 'src/components';
import {
  hashtagsSelect,
  loadHashtags,
  requestHashtagsSelect,
} from 'src/redux/slices';
import {DECK, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {
  BaseHeadline,
  CardDeckNameField,
  DescriptionField,
  ImageField,
  TagSelectionField,
} from './components';
import createCardDeckValidationSchema from './createCardDeckValidations';
import ValidationText from '../components/ValidationText';

export default function CreateDeckScreen({navigation, route}) {
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);

  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);

  const initialValues = {
    cardDeckName: '',
    cardDeckDescription: '',
    cardDeckImage: DECK.IMAGE,
    hashtags: DECK.HASHTAGS,
  };
  const {base: primary, onBase: onPrimary} = Color.light[ColorVariant.primary];
  const defaultContainerStyle = [{backgroundColor: primary}, styles.container];
  const defaultContentStyle = [Typography.body.large, {color: onPrimary}];
  let render = 0;

  function onSubmitPress(value) {
    console.log('render field: ', value);
  }

  render++;

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.view}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitPress}
          validationSchema={createCardDeckValidationSchema}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <BaseHeadline content={render} style={styles.headline} />
              <View style={styles.media}>
                <BaseHeadline
                  content={'Chọn hình ảnh'}
                  style={styles.headline}
                />
                <ImageField />
              </View>
              <View style={styles.titleDeck}>
                <BaseHeadline
                  content={'Thêm tên bộ bài'}
                  style={styles.headline}
                />
                <CardDeckNameField
                  onBlur={handleBlur('cardDeckName')}
                  onChangeText={handleChange('cardDeckName')}
                  value={values.cardDeckName}
                />
                {errors.cardDeckName && touched.cardDeckName && (
                  <ValidationText content={errors.cardDeckName} />
                )}
              </View>
              <View style={styles.descriptionHolder}>
                <BaseHeadline
                  content={'Thêm mô tả bộ bài'}
                  style={styles.headline}
                />
                <DescriptionField
                  onBlur={handleBlur('cardDeckDescription')}
                  onChangeText={handleChange('cardDeckDescription')}
                  value={values.cardDeckDescription}
                />
                {errors.cardDeckDescription && (
                  <ValidationText content={errors.cardDeckDescription} />
                )}
              </View>
              <View style={styles.chipSelection}>
                <BaseHeadline
                  content={'Chọn hashtag'}
                  style={styles.headline}
                />
                <TagSelectionField data={hashtags} />
              </View>
              <View style={styles.action}>
                <TonalButton
                  content={'HOÀN TẤT'}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH?.SCREEN,
    flexDirection: 'column',
    paddingHorizontal: 12,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    width: '100%',
    aspectRatio: 10,
  },
  media: {
    width: '100%',
    aspectRatio: 1.5,
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDeck: {
    width: '100%',
    aspectRatio: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 24,
  },
  textInput: {
    width: '60%',
  },
  chipSelection: {
    width: '100%',
    aspectRatio: 5,
    paddingTop: 12,
  },
  buttonHolder: {
    width: '100%',
    aspectRatio: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12, // backgroundColor: 'gold',
  },
  descriptionHolder: {
    width: '100%',
    aspectRatio: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },
  action: {
    width: '100%',
    aspectRatio: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 180,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
  },
  buttonContent: {
    ...Typography.title.medium,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
