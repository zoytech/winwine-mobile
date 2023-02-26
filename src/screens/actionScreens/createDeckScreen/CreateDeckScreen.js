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
import {DECK, IMG_SRC, LIMIT, LimitInput, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {
  BaseHeadline,
  CardDeckNameField,
  DescriptionField,
  HeaderActionButtons,
  ImageField,
  TagSelectionField,
} from './components';
import createCardDeckValidationSchema from './createCardDeckValidations';
import {remove} from '../../../utils';
import {CardDeckApi} from '../../../apis';
import {ScreenKeys} from '../../../navigations/ScreenKeys';
import {TextInputHolder} from '../components';

export default function CreateDeckScreen({navigation, route}) {
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedImg, setSelectedImg] = useState('');
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const [nameCharCount, setNameCharCount] = useState(0);

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
    const submittingValues = {
      ...value,
      hashtags: selectedHashtags,
      cardDeckImage: selectedImg,
    };
    const config = {
      body: submittingValues,
    };
    try {
      const response = await CardDeckApi.postCardDeck(config);
      handleNavigateCreateCardScreen(response?.data);
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

  function handleNavigateCreateCardScreen(values) {
    const {
      cardDeckId,
      cardDeckName,
      cardDeckImage,
      cardDeckDescription,
      hashtags: deckHashtags,
    } = values;
    navigation.navigate({
      name: ScreenKeys.CREATE_CARD,
      params: {
        cardDeckIdParam: cardDeckId,
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
        cardDeckDescriptionParam: cardDeckDescription,
        hashtagsParam: deckHashtags ? deckHashtags : DECK?.HASHTAGS,
      },
    });
  }

  function renderBaseHeadline(content) {
    return <BaseHeadline content={content} style={styles.headline} />;
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
              <HeaderActionButtons style={styles.headerAction} />
              <ImageField
                data={imgArr}
                content={'Chọn hình ảnh'}
                onImageSelectPress={handleImageSelectPress}
                style={styles.media}
              />
              {renderBaseHeadline('Tên bộ bài')}
              <Field
                component={TextInputHolder}
                name={'cardDeckName'}
                style={styles.cardDeckInput}
                leftContent={'Tên bộ bài'}
                rightContent={`(${nameCharCount}/${LimitInput.CARD_DECK_NAME})`}
              />
              {renderBaseHeadline('Mô tả bộ bài')}
              <Field
                component={TextInputHolder}
                name={'cardDeckDescription'}
                style={styles.cardDeckInput}
                leftContent={'Mô tả'}
                rightContent={`(${descriptionCharCount}/${LimitInput.CARD_DECK_DESCRIPTION})`}
              />
              {renderBaseHeadline('Chọn hashtag')}
              <TagSelectionField
                style={styles.chipSelection}
                data={hashtags}
                onSelectChipOption={handleHashtagsSelectPress}
              />
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
    paddingHorizontal: 16,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAction: {
    width: '100%',
    aspectRatio: 9,
  },
  headline: {
    width: '100%',
    aspectRatio: 7.8,
    marginTop: 16,
    paddingVertical: 6,
  },
  media: {
    height: 221,
  },
  cardDeckInput: {
    width: '100%',
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
    paddingTop: 12,
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
  imageContainer: {
    width: 120,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
