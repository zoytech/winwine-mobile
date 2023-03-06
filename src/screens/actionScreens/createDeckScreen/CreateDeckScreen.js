import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Formik} from 'formik';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton, SpinnerType1} from 'src/components';
import {
  hashtagsSelect,
  loadHashtags,
  requestHashtagsSelect,
} from 'src/redux/slices';
import {IMG_SRC, LimitInput, WIDTH} from 'src/constants';
import {
  BaseHeadline,
  HeaderActionButtons,
  ImageField,
  TagSelectionField,
} from './components';
import createCardDeckValidationSchema from './createCardDeckValidations';
import {remove} from 'src/utils';
import {CardDeckApi} from 'src/apis';
import {TextInputHolder} from '../components';

export default function CreateDeckScreen(props) {
  const {navigation, route, onOpenModal = () => {}} = props;
  const cardsParam = route.params?.cardsParam;

  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);

  const initialImage = IMG_SRC[1];
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedImg, setSelectedImg] = useState(initialImage);

  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);

  const initialValues = {
    cardDeckName: '',
    cardDeckDescription: '',
    cards: [],
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
      cards: cardsParam,
    };
    console.log('submittingValues: ', submittingValues);
    const config = {
      body: submittingValues,
    };
    try {
      const response = await CardDeckApi.postCardDeck(config);
      handleOpenCreateCardBottomSheet(response?.data);
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

  function handleOpenCreateCardBottomSheet({cardDeckId}) {
    onOpenModal();
  }

  function renderBaseHeadline(content) {
    return <BaseHeadline content={content} style={styles.headline} />;
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitPress}
      validationSchema={createCardDeckValidationSchema}>
      {({handleSubmit, isValid}) => (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          style={defaultContainerStyle}>
          <HeaderActionButtons
            style={styles.headerAction}
            onSubmit={handleSubmit}
            disabled={!isValid}
          />
          <ImageField
            data={imgArr}
            initialImage={initialImage}
            onImageSelectPress={handleImageSelectPress}
            style={styles.media}
            BaseHeadlineComponent={
              <BaseHeadline
                content={'Thêm hình ảnh'}
                style={styles.imageHeadline}
              />
            }
          />
          {renderBaseHeadline('Nhập tên bộ bài')}
          <Field
            component={TextInputHolder}
            name={'cardDeckName'}
            style={styles.cardDeckInput}
            placeholder={'Tên bộ bài'}
            limitContent={LimitInput.CARD_DECK_NAME}
            required={true}
          />
          {renderBaseHeadline('Nhập mô tả')}
          <Field
            component={TextInputHolder}
            name={'cardDeckDescription'}
            style={styles.cardDeckInput}
            placeholder={'Mô tả'}
            limitContent={LimitInput.CARD_DECK_DESCRIPTION}
          />
          {renderBaseHeadline('Phân loại hashtag')}
          <TagSelectionField
            style={styles.chipSelection}
            data={hashtags}
            onSelectChipOption={handleHashtagsSelectPress}
          />
          {renderBaseHeadline('Thêm lá bài')}
          <View style={styles.action}>
            <FilledButton
              onPress={handleOpenCreateCardBottomSheet}
              content={'Create card'}
              style={{width: 150, height: 50}}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
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
    aspectRatio: 8,
  },
  headline: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  media: {
    height: 221,
  },
  imageHeadline: {
    paddingHorizontal: 30,
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
    paddingBottom: 300,
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
