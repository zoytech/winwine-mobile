import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {Field, Formik} from 'formik';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {SelectedPlaceholder, TextInputHolder} from '../components';
import {BaseHeadline} from '../createDeckScreen/components';
import CreatingCardItem from './CreatingCardItem';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {HEIGHT, LimitInput, WIDTH} from 'src/constants';
import BottomSheetButton from './BottomSheetButton';

export default function CreateCardBottomSheet(props) {
  const {
    navigation,
    route,
    createdCards = [],
    onReceiveCardContents = () => {},
    ...otherProps
  } = props;
  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };
  const [creatingCards, setCreatingCards] = useState(createdCards);
  const [currentCardContent, setCurrentCardContent] = useState({});
  const [selectedCardId, setSelectedCardId] = useState(0);
  const cardNumber = creatingCards.length;
  const HIT_SLOP = {top: 20, bottom: 20, right: 20, left: 20};
  const backgroundModalColor =
    StateLayers.light[StateLayersVariant.primary]?.level_008;
  const containerColor = Color.light[ColorVariant.primary]?.container;

  useEffect(() => {
    onReceiveCardContents(creatingCards);
  }, [creatingCards]);

  function onSubmitPress(values, {resetForm}) {
    if (values.cardTitle.length > 0) {
      const creatingCardId = cardNumber + 1;
      setCurrentCardContent(values);
      setCreatingCards([...creatingCards, {id: creatingCardId, ...values}]);
      setSelectedCardId(creatingCardId);
      resetForm();
    }
  }

  function handleSelectCardItem(item) {
    setSelectedCardId(item?.id);
    setCurrentCardContent(item);
  }

  function renderCardItemComponent({item, index}) {
    const {cardTitle, id} = item || {};
    return (
      <SelectedPlaceholder
        onPress={() => handleSelectCardItem(item)}
        key={index}
        selected={selectedCardId === id}
        style={styles.cardOutline}>
        <CreatingCardItem
          content={cardTitle}
          style={styles.cardContainer}
          contentStyle={styles.cardContent}
        />
      </SelectedPlaceholder>
    );
  }

  return (
    <BottomSheetScrollView
      {...otherProps}
      style={styles.container}
      scrollEnabled={true}>
      <CreatingCardItem
        style={styles.currentCard}
        content={currentCardContent?.cardTitle}
        contentStyle={styles.cardContent}
      />

      <Formik initialValues={initialValues} onSubmit={onSubmitPress}>
        {({handleSubmit, isValid}) => (
          <>
            <View style={styles.formContainer}>
              <BaseHeadline content={'Thêm nội dung lá bài'} />
              <Field
                component={TextInputHolder}
                name={'cardTitle'}
                autoFocus={true}
                placeholder={'Nội dung lá bài'}
                maxLength={LimitInput.CARD_TITLE}
              />
              <BaseHeadline
                content={'Các lá bài khác'}
                style={styles.baseHeadlineContainer}
              />
              {cardNumber === 0 ? (
                <View style={styles.contentContainer}>
                  <CreatingCardItem style={styles.cardOutline} />
                </View>
              ) : (
                <BottomSheetFlatList
                  data={creatingCards}
                  renderItem={renderCardItemComponent}
                  horizontal={true}
                  ItemSeparatorComponent={<View style={{width: 16}} />}
                  contentContainerStyle={styles.contentContainer}
                />
              )}
            </View>
            <BottomSheetButton
              onPress={handleSubmit}
              disabled={!isValid}
              hitSlop={HIT_SLOP}
              icon={'plus'}
            />
          </>
        )}
      </Formik>
    </BottomSheetScrollView>
  );
}
const styles = StyleSheet.create({
  container: {},
  backdropContainer: {
    width: WIDTH.SCREEN,
    aspectRatio: 9 / 18,
    opacity: 0.5,
  },
  currentCard: {
    width: 156,
    aspectRatio: 0.66,
    marginHorizontal: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  baseHeadlineContainer: {
    // paddingHorizontal: 16,
  },
  contentContainer: {
    alignItems: 'flex-start', // paddingHorizontal: 16,
    paddingBottom: 60,
  },
  cardAndFabContainer: {
    flexDirection: 'row', // paddingHorizontal: 10,
  },
  cardOutline: {
    width: 114,
    aspectRatio: 0.85,
    borderRadius: 12,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    ...Typography.heading.small,
    color: Color.light[ColorVariant.primary]?.onContainer,
  },
  fabContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'coral',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabPosition: {
    position: 'absolute',
    right: 34,
    bottom: 32 + HEIGHT.BOTTOM_BAR,
  },
  fabIcon: {
    size: 44 / 2,
  },
});

/*
<FilledIconButton
              name={'plus'}
              onPress={handleSubmit}
              style={styles.fabContainer}
              iconStyle={styles.fabIcon}
              disabled={!isValid}
              hitSlop={HIT_SLOP}
            />
 */
