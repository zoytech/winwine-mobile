import {StyleSheet, Text, View} from 'react-native';
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
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
