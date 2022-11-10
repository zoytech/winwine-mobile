import React from 'react';
import {CardDialogContent} from 'src/components';

export default function EndingGameDialog(props) {
  const {
    headline,
    subHeadLeft,
    media,
    onMainActionPress = () => {},
    onSubActionPress = () => {},
  } = props;
  // const dispatch = useDispatch();
  // const cardDeckItem = useSelector(cardDeckSelector);
  // useEffect(() => {
  //   dispatch(loadCardDeckById(id));
  // }, [dispatch]);

  return (
    <CardDialogContent
      headline={headline}
      subHeadLeft={subHeadLeft}
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
