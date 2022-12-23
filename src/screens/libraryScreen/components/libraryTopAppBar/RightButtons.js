import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {RegisterAnnounceDialog} from 'src/screens';
import {StandardIconButton} from 'src/components';

export default function RightButtons(props) {
  const {navigation, route, userToken, style, iconStyle, ...otherProps} = props;

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

  function handleSearchPressed() {
    console.log('handleSearchPressed: ');
  }

  function handleCreatePressed() {
    if (userToken === null) {
      navigation.navigate({
        name: ScreenKeys.CREATE_ACTION,
      });
    } else {
      navigateRegisterAnnounceDialog();
    }
  }

  const containerStyle = [styles.container, style];

  const iconProps = {
    style: iconStyle,
    iconStyle: {size: 30},
  };
  return (
    <View {...otherProps} style={containerStyle}>
      <StandardIconButton
        name={'search1'}
        onPress={handleSearchPressed}
        {...iconProps}
      />
      <StandardIconButton
        name={'plus'}
        onPress={handleCreatePressed}
        {...iconProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
