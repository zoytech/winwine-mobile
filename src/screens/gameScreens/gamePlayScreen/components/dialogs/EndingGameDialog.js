import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CardDialogContent} from 'src/components';
import TagName from '../TagName';

export default function EndingGameDialog(props) {
  const {
    headline,
    hashtags = [],
    media,
    onMainActionPress = () => {},
    onSubActionPress = () => {},
  } = props;

  function renderHashtags() {
    return (
      <View style={styles.hashtagLayout}>
        {hashtags.map(hashtag => (
          <Text key={hashtag}>{hashtag}</Text>
        ))}
      </View>
    );
  }

  return (
    <CardDialogContent
      headline={headline}
      subHeadLeft={renderHashtags()}
      media={media}
      supportingText={'Bạn đã chơi hết rồi'}
      mainAction={'Chơi bộ mới'}
      subAction={'Chơi lại'}
      onMainActionPress={onMainActionPress}
      onSubActionPress={onSubActionPress}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
  },
  hashtagLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
/*
const handlePressOutlinedButton = () => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: deckId || '',
      },
      merge: true,
    });
  };

 */
