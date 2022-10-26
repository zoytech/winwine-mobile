import {BasicDialog} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function ExitGameDialog({routes, navigation}) {
  function handleMainActionPress() {
    navigation.navigate({
      name: ScreenKeys.HOME,
    });
  }

  function handleSubActionPress() {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
    });
  }

  return (
    <BasicDialog
      headline={'Exit this game ?'}
      supportingText={'Leave and return to the home screen.'}
      mainAction={'EXIT'}
      subAction={'RESUME'}
      onMainActionPress={handleMainActionPress}
      onSubActionPress={handleSubActionPress}
    />
  );
}
