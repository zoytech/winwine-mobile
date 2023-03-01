import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {Field, Formik} from 'formik';
import {FilledButton} from 'src/components';
import {TextInputHolder} from '../components';
import {Color, ColorVariant, Typography} from 'src/themes';
import ShowCreatingCardList from './ShowCreatingCardList';
import {ScreenKeys} from '../../../navigations/ScreenKeys';
import {DECK} from '../../../constants';

export default function CreateCardScreen(props) {
  const {navigation} = props;
  const [creatingCards, setCreatingCards] = useState([]);
  const initialValues = {
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
  };

  function onSubmitPress(values, {resetForm}) {
    setCreatingCards([...creatingCards, values]);
    resetForm();
  }

  function handleSaveCards() {}

  return (
    <View>
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
            <View style={styles.actionContainer}>
              <FilledButton content={'Thêm mới'} onPress={handleSubmit} />
              <FilledButton content={'Lưu'} onPress={handleSaveCards} />
            </View>
          </View>
        )}
      </Formik>
      <ShowCreatingCardList data={creatingCards} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    opacity: 0.5,
  },
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
  actionContainer: {},
});
