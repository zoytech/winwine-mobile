import {
  BottomSheetFlatList,
  BottomSheetModalProvider,
  BottomSheetModal,
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
import {ScreenKeys} from '../../../navigations/ScreenKeys';

export default function CreateCardBottomSheet(props) {
  const {navigation, route, onCloseModal = () => {}, ...otherProps} = props;
  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };
  const [creatingCards, setCreatingCards] = useState([]);

  function onSubmitPress(values, {resetForm}) {
    if (values.cardTitle.length > 0) {
      setCreatingCards([...creatingCards, values]);
      resetForm();
    }
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

  return (
    <>
      <View style={styles.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmitPress}>
          {({handleSubmit, isValid}) => (
            <View style={styles.scrollView}>
              <BaseHeadline content={'Thêm nội dung lá bài'} />
              <Field
                component={TextInputHolder}
                name={'cardTitle'}
                autoFocus={true}
              />
              <View style={styles.buttonContainer}>
                <FilledButton content={'Thêm mới'} onPress={handleSubmit} />
                <FilledButton content={'Lưu'} onPress={onCloseModal} />
              </View>
            </View>
          )}
        </Formik>
        <View>
          <BaseHeadline content={'Các lá bài khác'} />
        </View>
      </View>
      {/*<BottomSheetFlatList*/}
      {/*  data={creatingCards}*/}
      {/*  renderItem={renderCardItemComponent}*/}
      {/*  horizontal={true}*/}
      {/*  ItemSeparatorComponent={<View style={{width: 16}} />}*/}
      {/*  style={styles.cardList}*/}
      {/*  contentContainerStyle={styles.contentContainer}*/}
      {/*/>*/}
    </>
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
