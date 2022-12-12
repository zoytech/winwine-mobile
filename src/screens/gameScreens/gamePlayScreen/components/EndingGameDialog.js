import React from 'react';
import {StyleSheet} from 'react-native';
import {CardDialogContent} from 'src/components';
import TagName from './TagName';

export default function EndingGameDialog(props) {
  const {
    headline,
    subHeadLeft,
    media,
    onMainActionPress = () => {},
    onSubActionPress = () => {},
  } = props;

  function renderSubHeadLeft() {
    return <TagName content={subHeadLeft} iconStyle={styles.icon} />;
  }

  return (
    <CardDialogContent
      headline={headline}
      subHeadLeft={renderSubHeadLeft()}
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
