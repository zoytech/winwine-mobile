import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Formik} from 'formik';
import Snackbar from 'react-native-snackbar';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton, FilledIconButton, SpinnerType1} from 'src/components';
import {
  hashtagsSelect,
  loadHashtags,
  requestHashtagsSelect,
} from 'src/redux/slices';
import {HEIGHT, IMG_SRC, LimitInput, LimitRender, WIDTH} from 'src/constants';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {remove} from 'src/utils';
import {CardDeckApi} from 'src/apis';
import {HeaderActionButtons, ImageField, TagSelectionField} from './components';
import createCardDeckValidationSchema from './createCardDeckValidations';
import {TextInputHolder, BaseHeadline} from '../components';
import {CreateCardList} from './components/';

let count = 0;
export default function CreateDeckScreen(props) {
  const {navigation, route, createdCards, onOpenModal = () => {}} = props;
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);
  const [receivedCards, setReceivedCards] = useState(createdCards);
  const initialImage = IMG_SRC[1];
  const selectedImg = useRef(initialImage);
  const selectedHashtags = useRef([]);
  const processedCreatedCards = createdCards.map(
    ({cardId, ...otherFields}) => otherFields,
  );
  useEffect(() => {
    setReceivedCards(createdCards);
  }, [createdCards]);
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
  const {surface: surfaceColor, onSurface: onSurfaceColor} =
    Color.light[ColorVariant.inverse];

  const defaultContainerStyle = [
    {
      backgroundColor: onPrimary,
    },
    styles.container,
  ];
  const snackbarProps = {
    textColor: onSurfaceColor,
    backgroundColor: surfaceColor,
    duration: Snackbar.LENGTH_SHORT,
  };

  async function onSubmitPress(value) {
    const submittingValues = {
      ...value,
      hashtags: selectedHashtags.current,
      cardDeckImage: selectedImg.current,
      cards: processedCreatedCards,
    };
    selectedHashtags.current = [];
    selectedImg.current = '';
    console.log('processedCreatedCards: ', processedCreatedCards, (count += 1));

    const config = {
      body: submittingValues,
    };
    try {
      const response = await CardDeckApi.postCardDeck(config);
      // handleOpenCreateCardBottomSheet(response?.data);
      console.log('response?.data: ', response?.data);
      if (response?.data) {
        handleSuccessSubmitSnackbar();
      } else {
        handleFailSubmitSnackbar();
      }
    } catch (e) {
      console.log('Fail to post card deck: ', e);
      handleFailSubmitSnackbar();
    } finally {
      navigation.replace(ScreenKeys.CREATE_CARD);
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
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

  function handleSuccessSubmitSnackbar() {
    Snackbar.show({
      text: 'Tạo bộ bài thành công',
      ...snackbarProps,
    });
  }

  function handleFailSubmitSnackbar() {
    Snackbar.show({
      text: 'Tạo bộ bài thất bại',
      ...snackbarProps,
    });
  }

  function handleRemoveCardItem(cardItem, cardId) {
    remove.elementAtMiddle(createdCards, cardItem);
    createdCards.forEach((card, index) => (card.cardId = index + 1));
    console.log([...createdCards]);
    setReceivedCards([...createdCards]);
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
              onStopPress={handleNavigateBack}
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
            <View style={styles.cardHeadlineContainer}>
              <BaseHeadline
                content={'Lá bài'}
                style={[styles.headline, {marginTop: 0}]}
              />
              <View style={styles.cardCounterContainer}>
                <Text
                  style={[
                    styles.cardCounter,
                    Typography.body.small,
                  ]}>{`(${receivedCards.length}/${LimitRender?.CREATE_ABLE_CARDS})`}</Text>
              </View>
            </View>
            <CreateCardList
              data={receivedCards}
              style={styles.cardListContainer}
              onRemoveCardItem={handleRemoveCardItem}
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
  cardHeadlineContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  cardCounterContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCounter: {
    textAlign: 'center',
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
