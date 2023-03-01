import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useCallback, useMemo, useRef, useState} from 'react';
import {Field, Formik} from 'formik';
import {FilledButton, FilledCard} from 'src/components';
import {TextInputHolder} from '../components';
import {BaseHeadline} from '../createDeckScreen/components';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {CreateDeckScreen} from '../createDeckScreen';
import {WIDTH} from 'src/constants';

export default function CreateCardBottomSheet(props) {
  const {navigation, route} = props;
  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };
  const [creatingCards, setCreatingCards] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    props => renderBackdropComponent(props),
    [],
  );

  function onSubmitPress(values, {resetForm}) {
    if (values.cardTitle.length > 0) {
      setCreatingCards([...creatingCards, values]);
      resetForm();
    }
  }

  function handleClosePress() {
    bottomSheetRef.current.close();
    navigation.goBack();
  }

  function renderCardItemComponent({item, index}) {
    const {cardTitle, cardDescription} = item || {};
    console.log('cardTitle: ', cardTitle);

    return (
      <FilledCard key={index} style={styles.cardContainer}>
        <Text style={styles.cardContent}>{cardTitle}</Text>
      </FilledCard>
    );
  }

  function renderBackdropComponent(backdropProps) {
    return (
      <Pressable
        {...backdropProps}
        style={styles.backdropContainer}
        onPress={handleClosePress}>
        <CreateDeckScreen />
      </Pressable>
    );
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      overDragResistanceFactor={0}>
      <View style={styles.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmitPress}>
          {({handleSubmit, isValid}) => (
            <View style={styles.scrollView}>
              <View style={styles.taskInput}>
                <Field
                  component={TextInputHolder}
                  name={'cardTitle'}
                  autoFocus={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <FilledButton content={'Thêm mới'} onPress={handleSubmit} />
                <FilledButton content={'Lưu'} onPress={handleClosePress} />
              </View>
            </View>
          )}
        </Formik>
        <View>
          <BaseHeadline content={'Các lá bài khác'} />
        </View>
      </View>
      <BottomSheetFlatList
        data={creatingCards}
        renderItem={renderCardItemComponent}
        horizontal={true}
        ItemSeparatorComponent={<View style={{width: 16}} />}
        style={styles.cardList}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  backdropContainer: {
    width: WIDTH.SCREEN,
    aspectRatio: 9 / 18,
    opacity: 0.5,
  },
  cardList: {},
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  cardContainer: {
    width: 156,
    aspectRatio: 0.64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    ...Typography.heading.small,
    color: Color.light[ColorVariant.primary]?.onContainer,
  },
});
