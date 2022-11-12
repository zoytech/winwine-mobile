import React from 'react';
import {CardDialogContent} from 'src/components';
import {TagName} from '../../../components';

export default function EndingGameDialog(props) {
  const {
    headline,
    subHeadLeft,
    media,
    onMainActionPress = () => {},
    onSubActionPress = () => {},
  } = props;

  function renderSubHeadLeft() {
    return <TagName content={subHeadLeft} />;
  }

  return (
    <CardDialogContent
      headline={headline}
      subHeadLeft={renderSubHeadLeft()}
      media={media}
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
