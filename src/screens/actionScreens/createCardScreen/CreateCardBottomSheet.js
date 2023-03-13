import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {Field, Formik} from 'formik';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Color, ColorVariant, Typography} from 'src/themes';
import {LimitInput, LimitRender} from 'src/constants';
import {remove} from 'src/utils';
import {BottomSheetFilledButton, BottomSheetStandardButton} from './components';
import {
  SelectedPlaceholder,
  TextInputHolder,
  CreatingCardItem,
  BaseHeadline,
} from '../components';

export default function CreateCardBottomSheet(props) {
  const {
    navigation,
    route,
    createdCards = [],
    contentStyle,
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
  const HIT_SLOP = {top: 20, bottom: 20, right: 20, left: 20};
  const currentCardsLength = creatingCards.length;
  const onPrimaryColor = Color.light[ColorVariant.primary]?.onContainer;
  const currentContentStyle = [
    Typography.body.medium,
    {color: onPrimaryColor},
    contentStyle,
  ];
  const listContentStyle = [
    Typography.body.small,
    {color: onPrimaryColor},
    contentStyle,
  ];

  useEffect(() => {
    onReceiveCardContents(creatingCards);
  }, [creatingCards]);

  function onSubmitPress(values, {resetForm}) {
    if (currentCardsLength === LimitRender.CREATE_ABLE_CARDS) {
      alert('Excess number of card');
    } else if (values.cardTitle.length > 0) {
      const generateId = currentCardsLength + 1;
      setCurrentCardContent(values);
      setCreatingCards([...creatingCards, {cardId: generateId, ...values}]);
      setSelectedCardId(generateId);
      resetForm();
    }
  }

  function handleSelectCardItem(item, key) {
    setSelectedCardId(item?.cardId);
    setCurrentCardContent(item);
  }

  function handleRemoveCardItem(item, key) {
    remove.elementAtMiddle(creatingCards, item);
    creatingCards.forEach((card, index) => (card.cardId = index + 1));
    const removedCards = [...creatingCards];
    setSelectedCardId(0);
    setCurrentCardContent('');
    setCreatingCards(removedCards);
  }

  function renderCardItemComponent({item, index}) {
    const {cardTitle, cardId} = item || {};
    return (
      <>
        <SelectedPlaceholder
          onPress={() => handleSelectCardItem(item, cardId)}
          key={index}
          selected={selectedCardId === cardId}
          style={styles.cardOutline}>
          <CreatingCardItem
            content={cardTitle}
            style={styles.cardContainer}
            contentStyle={listContentStyle}
            numberOfLines={6}
            ellipsizeMode={'tail'}
            upperStyle={styles.upperCardItem}
            id={cardId}
          />
        </SelectedPlaceholder>
        <BottomSheetStandardButton
          onPress={() => handleRemoveCardItem(item, cardId)}
          hitSlop={HIT_SLOP}
          icon={'close'}
          isFab={true}
          style={styles.removeButton}
        />
      </>
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
        contentStyle={[currentContentStyle, styles.currentText]}
        contentContainerStyle={styles.currentContentContainer}
        upperStyle={styles.upperCurrentCard}
        id={selectedCardId > 0 && selectedCardId}
        numberOfLines={9}
        ellipsizeMode={'tail'}
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
                multiline={true}
              />
              <BaseHeadline
                content={'Các lá bài khác'}
                style={styles.baseHeadline}
              />
              {creatingCards.length === 0 ? (
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
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>
            <BottomSheetFilledButton
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
  currentCard: {
    width: 156,
    aspectRatio: 0.66,
    alignSelf: 'center',
    padding: 7,
  },
  upperCurrentCard: {
    height: '10%',
  },
  currentContentContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentText: {
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  baseHeadline: {
    height: 35,
    paddingTop: 0,
  },
  contentContainer: {
    alignItems: 'flex-start', // justifyContent: 'flex-start',
  },
  cardOutline: {
    width: 114,
    aspectRatio: 0.85,
    borderRadius: 3,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    padding: 4,
  },
  upperCardItem: {
    height: '20%',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 0,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});
