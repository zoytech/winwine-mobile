import {StyleSheet, View, Text} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function SmallTopBar(props) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    style,
    contentStyle,
    headerTitleStyle,
    rightContainerStyle,
    renderRightComponents,
    renderMiddleComponent,
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const containerStyle = [styles.container, {backgroundColor: surface}, style];
  const defaultContentStyle = [
    Typography.title.large,
    {color: onSurface},
    contentStyle,
  ];

  function renderRight({iconStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof renderRightComponents === 'function') {
      return renderRightComponents({iconStyle});
    }
    return renderRightComponents;
  }

  return (
    <View {...otherProps} style={containerStyle}>
      <StandardIconButton
        name={leadingIcon}
        onPress={onLeadingIconPress}
        style={styles.icon}
      />
      <Text numberOfLines={1} style={defaultContentStyle}>
        {content}
      </Text>
      <View style={[styles.rightContainer, rightContainerStyle]}>
        {renderRight({iconStyle: styles.icon})}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  icon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
  rightContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
});

/*
<View style={styles.iconDisplay}>
        {trailingIcons &&
          trailingIcons.map(({name, handlePress}) =>
            renderIconButtonItem(name, handlePress),
          )}
      </View>
 */
