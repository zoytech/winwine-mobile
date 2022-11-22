import {StyleSheet} from 'react-native';
import {MediumTopBar, StandardIconButton} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {ExitGameDialog} from './index';

export default function CustomTopAppBar(props) {
  const {navigation, routes, content, style, contentStyle, ...otherProps} =
    props;

  function renderRightComponents({iconStyle}) {
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleNavigateExitGameDialog}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  function handleNavigateExitGameDialog() {
    const handleMainDialogPress = () => {
      navigation.navigate({
        name: ScreenKeys.HOME,
      });
    };
    const handleSubDialogPress = () => {
      navigation.goBack();
    };
    navigation.navigate({
      name: ScreenKeys.BASIC_DIALOG,
      params: {
        content: (
          <ExitGameDialog
            onMainActionPress={handleMainDialogPress}
            onSubActionPress={handleSubDialogPress}
          />
        ),
      },
    });
  }

  return (
    <MediumTopBar
      {...otherProps}
      content={content}
      subContent={'BẠN ĐANG CHƠI BỘ'}
      leadingIcon={'arrowleft'}
      onLeadingIconPress={() => navigation.goBack()}
      renderRightComponents={renderRightComponents}
    />
  );
}

const styles = StyleSheet.create({
  headerButtonIcon: {
    borderRadius: 20,
    minWidth: 48,
    minHeight: 48,
  },
});
