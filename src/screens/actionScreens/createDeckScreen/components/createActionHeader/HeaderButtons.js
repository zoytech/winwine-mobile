import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';
import {FilledButton} from 'src/components';

const actions = {
  TASKS: {
    ADD: 'Thêm thử thách',
  },
};

export default function HeaderButtons(props) {
  const {
    renderRightComponents,
    children,
    style,
    onStaringDeckPress = () => {},
    onDownloadDeckPress = () => {},
    onNavigateMoreActionPress = () => {},
    ...otherProps
  } = props;

  const containerStyle = [styles.container, style];

  function renderHeaderLeftButtons() {
    return <FilledButton content={actions.TASKS.ADD} />;
  }

  return (
    <View {...otherProps} style={containerStyle}>
      {children}
      <View style={styles.subAction}>{renderHeaderLeftButtons()}</View>
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
