import React, {useEffect, useRef, useState} from 'react';
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
import {ScreenKeys} from '../../../navigations/ScreenKeys';

let count = 0;
export default function CreateDeckScreen(props) {
  const {navigation, route, createdCards, onOpenModal = () => {}} = props;
  const [currentCardData, setCurrentCardData] = useState([]);
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);
  const initialImage = IMG_SRC[1];
  // const [selectedHashtags, setSelectedHashtags] = useState([]);
  // const [selectedImg, setSelectedImg] = useState(initialImage);
  const selectedImg = useRef(initialImage);
  const selectedHashtags = useRef([]);
  const mounted = useRef(false);
  console.log('mounted: ', mounted.current);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  console.log('re-render: ', (count += 1));

  useEffect(() => {
    dispatch(loadHashtags());
    const processedCreatedCards = createdCards.map(
      ({id, ...otherFields}) => otherFields,
    );
    console.log('processedCreatedCards: ', processedCreatedCards);
    setCurrentCardData(processedCreatedCards);
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
  const defaultContentStyle = [Typography.body.large, {color: primary}];

  async function onSubmitPress(value) {
    const submittingValues = {
      ...value,
      hashtags: selectedHashtags.current,
      cardDeckImage: selectedImg.current,
      cards: currentCardData,
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
    // JUST FOR TEST BECAUSE AFTER SUBMIT IT NAVIGATE TO NEW SCREEN
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
