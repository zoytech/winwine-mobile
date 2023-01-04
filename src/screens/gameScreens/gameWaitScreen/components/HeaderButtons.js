import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';
import {FilledButton} from 'src/components';

export default function HeaderButtons(props) {
  const {
    data,
    renderRightComponents,
    children,
    style,
    onFilledButtonPress = () => {},
    ...otherProps
  } = props;
  const containerStyle = [styles.container, style];

  function renderHeaderRightButton() {
    return (
      <FilledButton
        content={'Chơi ngay'}
        contentStyle={styles.buttonContent}
        onPress={onFilledButtonPress}
      />
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      {children}
      <View style={styles.mainAction}>{renderHeaderRightButton()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 7,
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  mainAction: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subAction: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContent: {
    ...Typography.title.medium,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  icon: {
    minWidth: 50,
    minHeight: 50,
    width: 50,
    aspectRatio: 1,
    borderRadius: 50 / 2,
  },
});
