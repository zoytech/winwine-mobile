import {StyleSheet, View} from 'react-native';
import {useState, useEffect} from 'react';
import {Field, Formik} from 'formik';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {FilledIconButton} from 'src/components';
import {SelectedPlaceholder, TextInputHolder} from '../components';
import {BaseHeadline} from '../createDeckScreen/components';
import CreatingCardItem from './CreatingCardItem';
import {Color, ColorVariant, Typography} from 'src/themes';
import {HEIGHT, LimitInput, WIDTH} from 'src/constants';

export default function CreateCardBottomSheet(props) {
  const {
    navigation,
    route,
    onReceiveCardContents = () => {},
    ...otherProps
  } = props;

  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };
  const [creatingCards, setCreatingCards] = useState([]);
  const [currentCardContent, setCurrentCardContent] = useState({});
  const [selectedCardId, setSelectedCardId] = useState(0);
  const cardNumber = creatingCards.length;
  console.log('creatingCards: ', creatingCards);
  useEffect(() => {
    onReceiveCardContents(creatingCards);
  }, []);

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
    <View {...otherProps} style={styles.container}>
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
                limitContent={LimitInput.CARD_TITLE}
              />
            </View>
            <BaseHeadline
              content={'Các lá bài khác'}
              style={styles.baseHeadlineContainer}
            />
            <View style={styles.cardAndFabContainer}>
              {cardNumber === 0 ? (
                <CreatingCardItem
                  style={[styles.cardContainer, styles.cardOutline]}
                />
              ) : (
                <BottomSheetFlatList
                  data={creatingCards}
                  renderItem={renderCardItemComponent}
                  horizontal={true}
                  ItemSeparatorComponent={<View style={{width: 16}} />}
                  contentContainerStyle={styles.contentContainer}
                />
              )}
              <FilledIconButton
                name={'plus'}
                onPress={handleSubmit}
                style={styles.fabContainer}
                iconStyle={styles.fabIcon}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
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
    paddingHorizontal: 16,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  cardAndFabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
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
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 12,
    right: 34,
    bottom: 46 + HEIGHT.BOTTOM_BAR,
  },
  fabIcon: {
    size: 44 / 2,
  },
});

/*
  <View style={styles.buttonContainer}>
                <FilledButton content={'Thêm mới'} onPress={handleSubmit} />
                <FilledButton content={'Lưu'} onPress={onCloseModal} />
              </View>
 */
