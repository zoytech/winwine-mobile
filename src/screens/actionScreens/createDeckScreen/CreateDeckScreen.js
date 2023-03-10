import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Formik} from 'formik';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton, FilledIconButton, SpinnerType1} from 'src/components';
import {
  hashtagsSelect,
  loadHashtags,
  requestHashtagsSelect,
} from 'src/redux/slices';
import {HEIGHT, IMG_SRC, LimitInput, WIDTH} from 'src/constants';
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
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import CreatingCardItem from '../createCardScreen/CreatingCardItem';
import CreateCardList from './CreateCardList';

export default function CreateDeckScreen(props) {
  const {navigation, route, createdCards, onOpenModal = () => {}} = props;
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);
  const initialImage = IMG_SRC[1];
  const selectedImg = useRef(initialImage);
  const selectedHashtags = useRef([]);
  const processedCreatedCards = createdCards.map(
    ({cardId, ...otherFields}) => otherFields,
  );
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
    {
      backgroundColor: onPrimary,
    },
    styles.container,
  ];

  async function onSubmitPress(value) {
    const submittingValues = {
      ...value,
      hashtags: selectedHashtags.current,
      cardDeckImage: selectedImg.current,
      cards: processedCreatedCards,
    };
    selectedHashtags.current = [];
    selectedImg.current = '';
    const config = {
      body: submittingValues,
    };
    try {
      const response = await CardDeckApi.postCardDeck(config);
      handleOpenCreateCardBottomSheet(response?.data);
      console.log('response: ', response);
    } catch (e) {
      console.log('Fail to post card deck: ', e);
    } finally {
      navigation.replace(ScreenKeys.CREATE_CARD);
    }
  }

  function handleHashtagsSelectPress(hashtagId) {
    if (selectedHashtags.current.includes(hashtagId)) {
      remove.elementAtMiddle(selectedHashtags.current, hashtagId);
    } else {
      selectedHashtags.current.push(hashtagId);
    }
  }

  function handleImageSelectPress(item) {
    if (selectedImg === item) {
      selectedImg.current = null;
    } else {
      selectedImg.current = item;
    }
  }

  function handleOpenCreateCardBottomSheet() {
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
        <>
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
                  content={'Chọn hình ảnh'}
                  style={styles.imageHeadline}
                />
              }
            />
            {renderBaseHeadline('Tên bộ bài')}
            <Field
              component={TextInputHolder}
              name={'cardDeckName'}
              style={styles.cardDeckInput}
              placeholder={'Tên bộ bài'}
              maxLength={LimitInput.CARD_DECK_NAME}
              required={true}
            />
            {renderBaseHeadline('Hashtag')}
            <TagSelectionField
              style={styles.chipSelection}
              data={hashtags}
              onSelectChipOption={handleHashtagsSelectPress}
            />
            {renderBaseHeadline('Mô tả')}
            <Field
              component={TextInputHolder}
              name={'cardDeckDescription'}
              style={styles.cardDeckInput}
              placeholder={'Mô tả'}
              maxLength={LimitInput.CARD_DECK_DESCRIPTION}
            />
            {renderBaseHeadline('Thêm lá bài')}
            <CreateCardList
              data={createdCards}
              style={styles.cardListContainer}
            />
          </ScrollView>
          <FilledIconButton
            onPress={handleOpenCreateCardBottomSheet}
            content={'Thêm thẻ bài'}
            style={styles.button}
            name={'plus'}
            contentStyle={styles.buttonContent}
          />
        </>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 100,
  },
  button: {
    width: 156,
    height: 44,
    borderRadius: 12,
    position: 'absolute',
    right: 34,
    bottom: 46 + HEIGHT.BOTTOM_BAR,
  },
  buttonContent: {
    ...Typography.label.large,
    marginLeft: 8,
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
  cardContainer: {
    width: 114,
    aspectRatio: 0.85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    ...Typography.heading.small,
    color: Color.light[ColorVariant.primary]?.onContainer,
  },
  cardListContainer: {
    width: '100%',
    paddingBottom: 100,
  },
});
