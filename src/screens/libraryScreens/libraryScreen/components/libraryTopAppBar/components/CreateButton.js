import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {RegisterAnnounceDialog} from 'src/screens';
import {StandardIconButton} from 'src/components';

export default function RightButtons(props) {
  const {navigation, userToken, style, ...otherProps} = props;

  function navigateRegisterAnnounceDialog() {
    const handleNavigateAuthStackPress = () => {
      navigation.navigate({
        name: ScreenKeys.SIGNUP_AU,
      });
    };
    const handleGoBackPress = () => {
      navigation.goBack();
    };
    navigation.navigate({
      name: ScreenKeys.BASIC_DIALOG,
      params: {
        content: (
          <RegisterAnnounceDialog
            onNavigateAuthStackPress={handleNavigateAuthStackPress}
            onGoBackPress={handleGoBackPress}
          />
        ),
      },
    });
  }

  function handleCreatePressed() {
    if (userToken === null) {
      navigation.navigate({
        name: ScreenKeys.CREATE_DECK,
      });
    } else {
      navigateRegisterAnnounceDialog();
    }
  }

  return (
    <StandardIconButton
      {...otherProps}
      name={'plus'}
      onPress={handleCreatePressed}
      style={style}
    />
  );
}
