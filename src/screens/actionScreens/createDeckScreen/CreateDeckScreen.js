import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1, TonalButton} from 'src/components';
import {
  hashtagsSelect,
  loadHashtags,
  requestHashtagsSelect,
} from 'src/redux/slices';
import {DECK, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {
  CardDeckNameField,
  DescriptionField,
  ImageField,
  TagSelectionField,
  TextInputHolder,
} from './components';

export default function CreateDeckScreen({navigation, route}) {
  const dispatch = useDispatch();
  const requesting = useSelector(requestHashtagsSelect);
  const hashtags = useSelector(hashtagsSelect);

  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);

  const {base: primary, onBase: onPrimary} = Color.light[ColorVariant.primary];
  const defaultContainerStyle = [{backgroundColor: primary}, styles.container];
  const defaultContentStyle = [Typography.body.large, {color: onPrimary}];
  let render = 0;

  function onSubmitPress() {
    alert('renderData');
  }

  render++;

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.view}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text>{render}</Text>
          </View>
          <View style={styles.media}>
            <ImageField name={'Chọn hình ảnh'} />
          </View>
          <View style={styles.titleDeck}>
            <CardDeckNameField name={'Thêm tên bộ bài'} />
          </View>
          <View style={styles.descriptionHolder}>
            <DescriptionField name={'Thêm mô tả bộ bài'} />
          </View>
          <View style={styles.chipSelection}>
            <TagSelectionField name={'Chọn hashtag'} data={hashtags} />
          </View>
          <View style={styles.action}>
            <TonalButton
              content={'HOÀN TẤT'}
              style={styles.button}
              contentStyle={styles.buttonContent}
              onPress={onSubmitPress}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH?.SCREEN,
    flexDirection: 'column',
    paddingHorizontal: 12,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    aspectRatio: 1.5,
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleDeck: {
    width: '100%',
    aspectRatio: 2.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 24,
  },
  textInput: {
    width: '80%',
  },
  chipSelection: {
    width: '100%',
    aspectRatio: 5,
    paddingTop: 12,
  },
  buttonHolder: {
    width: '100%',
    aspectRatio: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12, // backgroundColor: 'gold',
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
    paddingBottom: 180,
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
});
