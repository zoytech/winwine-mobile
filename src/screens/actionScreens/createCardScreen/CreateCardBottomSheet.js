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
import {Color, ColorVariant, Typography} from 'src/themes';
import {CreateDeckScreen} from '../createDeckScreen';

export default function CreateCardBottomSheet(props) {
  const {navigation, route} = props;
  const [creatingCards, setCreatingCards] = useState([]);
  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    props => (
      <Pressable style={styles.container} onPress={handleClosePress}>
        <CreateDeckScreen {...props} />
      </Pressable>
    ),
    [],
  );

  function onSubmitPress(values, {resetForm}) {
    setCreatingCards([...creatingCards, values]);
    resetForm();
  }

  function renderCreatingCardItem({item, index}) {
    const {cardTitle, cardDescription} = item || {};
    return (
      <FilledCard key={index} style={styles.cardContainer}>
        <Text style={styles.cardContent}>{cardTitle}</Text>
      </FilledCard>
    );
  }

  const handleClosePress = () => {
    bottomSheetRef.current.close();
    navigation.goBack();
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      overDragResistanceFactor={0}>
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
      <BottomSheetFlatList
        data={creatingCards}
        renderItem={renderCreatingCardItem}
        horizontal={true}
        ItemSeparatorComponent={<View style={{width: 6}} />}
      />
    </BottomSheet>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  background: {},
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: 156,
    aspectRatio: 0.64,
  },
  cardContent: {
    ...Typography.heading.small,
    color: Color.light[ColorVariant.primary]?.onContainer,
  },
});
