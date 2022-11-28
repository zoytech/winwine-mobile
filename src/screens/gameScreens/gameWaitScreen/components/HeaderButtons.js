import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';

export default function HeaderButtons(props) {
  const {
    renderLeftComponents,
    renderRightComponents,
    children,
    style,
    ...otherProps
  } = props;

  const containerStyle = [styles.container, style];

  function renderLeft({iconStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof renderLeftComponents === 'function') {
      return renderLeftComponents({iconStyle});
    }
    return renderLeftComponents;
  }

  function renderRight({buttonStyle, contentButtonStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof renderRightComponents === 'function') {
      return renderRightComponents({buttonStyle, contentButtonStyle});
    }
    return renderRightComponents;
  }

  return (
    <View {...otherProps} style={containerStyle}>
      {children}
      <View style={styles.subAction}>
        {renderLeft({iconStyle: styles.icon})}
      </View>
      <View style={styles.mainAction}>
        {renderRight({
          buttonStyle: styles.button,
          contentButtonStyle: styles.buttonContent,
        })}
      </View>
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
    borderRadius: 30 / 2,
  },
});
