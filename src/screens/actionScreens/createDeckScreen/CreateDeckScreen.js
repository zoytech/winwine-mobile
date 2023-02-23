import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Formik} from 'formik';

import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1, TonalButton} from 'src/components';
import {
  hashtagsSelect,
  loadHashtags,
  requestHashtagsSelect,
} from 'src/redux/slices';
import {IMG_SRC, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {
  BaseHeadline,
  CardDeckNameField,
  DescriptionField,
  ImageField,
  TagSelectionField,
} from './components';
import createCardDeckValidationSchema from './createCardDeckValidations';
import {remove} from '../../../utils';
import {CardDeckApi} from '../../../apis';

export default function CreateDeckScreen({navigation, route}) {
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);

  const initialValues = {
    cardDeckName: '',
    cardDeckDescription: '',
  };
  const imgArr = Object.values(IMG_SRC);
  const {base: primary, onBase: onPrimary} = Color.light[ColorVariant.primary];
  const defaultContainerStyle = [
    {backgroundColor: onPrimary},
    styles.container,
  ];
  const defaultContentStyle = [Typography.body.large, {color: primary}];

  async function onSubmitPress(value) {
    const rps = {
      ...value,
      hashtags: selectedHashtags,
      cardDeckImage: selectedImg,
    };
    const config = {
      body: JSON.stringify(rps),
    };
    try {
      await CardDeckApi.postCardDeck(config);
    } catch (e) {
      console.log('Fail to post card deck: ', e);
    }
    // JUST FOR TEST BECAUSE AFTER SUBMIT IT NAVIGATE TO NEW SCREEN
    setSelectedHashtags([]);
    setSelectedImg('');
  }

  function handleHashtagsSelectPress(hashtagId) {
    if (selectedHashtags.includes(hashtagId)) {
      remove.elementAtMiddle(selectedHashtags, hashtagId);
      setSelectedHashtags([...selectedHashtags]);
    } else {
      setSelectedHashtags([...selectedHashtags, hashtagId]);
    }
  }

  function handleImageSelectPress(item) {
    if (selectedImg === item) {
      setSelectedImg(null);
    } else {
      setSelectedImg(item);
    }
  }

  function renderBaseHeadline(content) {
    return (
      <BaseHeadline
        content={content}
        style={styles.headline}
        contentStyle={defaultContentStyle}
      />
    );
  }

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
          {({handleSubmit, isValid}) => (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.media}>
                {renderBaseHeadline('Chọn hình ảnh')}
                <ImageField
                  data={imgArr}
                  onImageSelectPress={handleImageSelectPress}
                />
              </View>
              <View style={styles.titleDeck}>
                {renderBaseHeadline('Thêm tên bộ bài')}
                <Field component={CardDeckNameField} name={'cardDeckName'} />
              </View>
              <View style={styles.descriptionHolder}>
                {renderBaseHeadline('Thêm mô tả bộ bài')}
                <Field
                  component={DescriptionField}
                  name={'cardDeckDescription'}
                />
              </View>
              <View style={styles.chipSelection}>
                {renderBaseHeadline('Chọn hashtag')}
                <TagSelectionField
                  data={hashtags}
                  onSelectChipOption={handleHashtagsSelectPress}
                />
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
    aspectRatio: 4,
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
