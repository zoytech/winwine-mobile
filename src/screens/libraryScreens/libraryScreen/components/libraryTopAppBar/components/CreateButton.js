import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {StandardIconButton} from 'src/components';
import ComingSoonDialog from './ComingSoonDialog';

export default function RightButtons(props) {
  const {navigation, userToken, style, ...otherProps} = props;

  function navigateRegisterAnnounceDialog() {
    navigation.navigate({
      name: ScreenKeys.BASIC_DIALOG,
      params: {
        content: <ComingSoonDialog onMainActionPress={handleMainDialogPress} />,
      },
    });

    function handleMainDialogPress() {
      navigation.goBack();
    }

    // navigation.navigate({
    //   name: ScreenKeys.BASIC_DIALOG,
    //   params: {
    //     content: (
    //       <RegisterAnnounceDialog
    //         onNavigateAuthStackPress={handleNavigateAuthStackPress}
    //         onGoBackPress={handleGoBackPress}
    //       />
    //     ),
    //   },
    // });
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
