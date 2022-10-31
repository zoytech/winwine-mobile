import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function SmallTopBar(props) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    trailingIcons = [],
    style,
    contentStyle,
    headerTitleStyle,
    children,
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const containerStyle = [styles.container, {backgroundColor: surface}, style];
  const defaultContentStyle = [
    Typography.title.large,
    {color: onSurface},
    contentStyle,
  ];

  function renderRightComponent(iconStyle) {
    if (typeof children === 'function') {
      return children(iconStyle);
    }
    return children;
  }

  function renderIconButtonItem(name, handlePress) {}

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={styles.targetSize}>
        <StandardIconButton
          name={leadingIcon}
          onPress={onLeadingIconPress}
          style={styles.icon}
        />
      </View>
      <View style={[headerTitleStyle, styles.title]}>
        <Text
          style={defaultContentStyle}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {content}
        </Text>
      </View>
      {renderRightComponent}
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
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
  iconDisplay: {
    flexDirection: 'row',
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
