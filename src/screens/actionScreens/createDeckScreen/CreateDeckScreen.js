import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
  cardDeckListSelector,
  requestingDeckListSelector,
} from 'src/redux/selectors';
import {defaultOfDeck, tagCardDeck, WIDTH} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';
import {removeIdenticalItemInArray} from 'src/utils';
import {loadCardDeckList} from 'src/redux/actions';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {ImageField, TagSelectionField, TextInputHolder} from './components';

export default function CreateDeckScreen({navigation, route}) {
  const dispatch = useDispatch();
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState(null);
  const [description, setDescription] = useState(null);
  const {IMAGE, DESCRIPTION, TITLE} = defaultOfDeck;
  const localStorageData = cardDeckList?.popularData;
  const rawTagIdData = localStorageData.map(item => item?.tag);
  const tagIdData = removeIdenticalItemInArray(rawTagIdData);
  const tagChipData = [
    {
      tagChipId: tagIdData[0],
      tagChipContent: tagCardDeck.ADULT,
    },
    {
      tagChipId: tagIdData[1],
      tagChipContent: tagCardDeck.BUDDY,
    },
    {
      tagChipId: tagIdData[2],
      tagChipContent: tagCardDeck.FIRST_MEETING,
    },
    {
      tagChipId: tagIdData[3],
      tagChipContent: tagCardDeck.KILLER,
    },
  ];
  useEffect(() => {
    dispatch(loadCardDeckList());
  }, [dispatch]);
  const {base: primary, onBase: onPrimary} = Color.light[ColorVariant.primary];

  const defaultContainerStyle = [{backgroundColor: primary}, styles.container];
  const defaultContentStyle = [Typography.body.large, {color: onPrimary}];

  function handleSubmitPress() {
    navigation.navigate({
      name: ScreenKeys.CREATE_CARD,
      params: {
        deckTitle: title ? title : TITLE,
        deckId: 100,
        deckDescription: description ? description : DESCRIPTION,
        deckSource: image ? {uri: image} : IMAGE,
        deckTag: tag ? tag : '',
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
            <TagSelectionField data={tagChipData} />
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
