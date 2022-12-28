import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';
import {
  FilledButton,
  StandardIconButton,
  StandardIconToggle,
} from 'src/components';

export default function HeaderButtons(props) {
  const {
    renderRightComponents,
    children,
    style,
    onStaringDeckPress = () => {},
    onDownloadDeckPress = () => {},
    onNavigateMoreActionPress = () => {},
    onFilledButtonPress = () => {},
    ...otherProps
  } = props;

  const containerStyle = [styles.container, style];

  function renderHeaderLeftButtons() {
    const starProps = {
      name: 'staro',
      selectedName: 'star',
      onPress: onStaringDeckPress(),
      style: styles.icon,
    };
    const downloadProps = {
      name: 'downcircleo',
      selectedName: 'downcircle',
      onPress: onDownloadDeckPress(),
      style: styles.icon,
    };
    const moreActionProps = {
      name: 'ellipsis1',
      selectedName: 'ellipsis1',
      onPress: onNavigateMoreActionPress(),
      style: styles.icon,
    };
    return (
      <>
        <StandardIconToggle {...starProps} />
        <StandardIconToggle {...downloadProps} />
        <StandardIconButton {...moreActionProps} />
      </>
    );
  }

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
      <View style={styles.subAction}>{renderHeaderLeftButtons()}</View>
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
  },
  mainAction: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    minWidth: 30,
    minHeight: 30,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
});
