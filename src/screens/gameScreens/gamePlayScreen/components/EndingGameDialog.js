import React from 'react';
import {CardDialogContent} from 'src/components';

export default function EndingGameDialog(props) {
  const {
    onMainActionPress = () => {},
    onSubActionPress = () => {},
    data,
  } = props;
  const {tag: tag, uri: uri, cardDeck: headline} = data || {};

  return (
    <CardDialogContent
      headline={headline}
      subHeadLeft={tag}
      media={uri}
      supportingText={'Bạn đã chơi hết rồi'}
      mainAction={'Play new deck'}
      subAction={'Play again'}
      onMainActionPress={onMainActionPress}
      onSubActionPress={onSubActionPress}
    />
  );
}
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
