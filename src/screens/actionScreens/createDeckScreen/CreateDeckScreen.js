import React, {useEffect, useState} from 'react';
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
  cardDeckSelector,
  hashtagsSelector,
  requestingCardDeckSelector,
  requestingHashtagsSelector,
} from 'src/redux/selectors';
import {defaultOfDeck, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {removeIdenticalItemInArray} from 'src/utils';
import {loadCardDeckList, loadCardDecks, loadHashtags} from 'src/redux/actions';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {ImageField, TagSelectionField, TextInputHolder} from './components';

export default function CreateDeckScreen({navigation, route}) {
  const dispatch = useDispatch();
  const requesting = useSelector(requestingHashtagsSelector);
  const hashtags = useSelector(hashtagsSelector);

  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState(null);
  const [description, setDescription] = useState(null);
  const {IMAGE, DESCRIPTION, TITLE} = defaultOfDeck;

  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);
  const {base: primary, onBase: onPrimary} = Color.light[ColorVariant.primary];

  const defaultContainerStyle = [{backgroundColor: primary}, styles.container];
  const defaultContentStyle = [Typography.body.large, {color: onPrimary}];

  function handleSubmitPress() {
    navigation.navigate({
      name: ScreenKeys.CREATE_CARD,
      params: {
        deckTitleParams: title ? title : TITLE,
        deckIdParams: 100,
        deckDescriptionParams: description,
        deckSourceParams: image ? {uri: image} : IMAGE,
        deckTagParams: tag ? tag : '',
      },
    });
  }

  function renderTitleDeckField() {
    const headlineStyle = [defaultContentStyle, Typography.title.large];
    return (
      <>
        <View>
          <Text style={headlineStyle}>{'Nhập tên bộ bài của bạn'}</Text>
        </View>
        <TextInputHolder
          contentStyle={defaultContentStyle}
          selectTextOnFocus={true}
        />
      </>
    );
  }

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
          <View style={styles.media}>
            <ImageField />
          </View>
          <View style={styles.titleDeck}>{renderTitleDeckField()}</View>
          <View style={styles.chipSelection}>
            <TagSelectionField data={hashtags} />
          </View>
          <View style={styles.action}>
            <TonalButton
              content={'HOÀN TẤT'}
              style={styles.button}
              contentStyle={styles.buttonContent}
              onPress={handleSubmitPress}
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
