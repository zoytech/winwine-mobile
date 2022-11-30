import {Animated, StyleSheet, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function SmallTopBar(props) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    onLayoutTopAppBar = () => {},
    style,
    contentStyle,
    headerTitleStyle,
    rightContainerStyle,
    RightComponents,
    CenterComponents,
    ...otherProps
  } = props;

  const {base: backgroundColor, onBase: contentColor} =
    Color.light[ColorVariant.surface];
  const containerStyle = [
    styles.container,
    {backgroundColor: backgroundColor},
    style,
  ];
  const defaultContentStyle = [
    Typography.title.large,
    {color: contentColor},
    contentStyle,
  ];

  function renderRight({iconStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof RightComponents === 'function') {
      return RightComponents({iconStyle});
    }
    return RightComponents;
  }

  return (
    <Animated.View
      {...otherProps}
      style={containerStyle}
      onLayout={e => onLayoutTopAppBar(e)}>
      <StandardIconButton
        name={leadingIcon}
        onPress={onLeadingIconPress}
        style={styles.icon}
      />
      <Animated.Text numberOfLines={1} style={defaultContentStyle}>
        {content}
      </Animated.Text>
      <View style={[styles.rightContainer, rightContainerStyle]}>
        {renderRight({iconStyle: styles.icon})}
      </View>
    </Animated.View>
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
