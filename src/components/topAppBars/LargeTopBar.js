import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function LargeTopBar(props) {
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
  const containerStyle = [
    styles.container,
    {
      backgroundColor: surface,
    },
    style,
  ];
  const defaultContentStyle = [
    styles.text,
    Typography.headline.medium,
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
      <View style={styles.actionBar}>
        <StandardIconButton
          name={leadingIcon}
          onPress={onLeadingIconPress}
          style={styles.icon}
        />
        <View style={[styles.rightContainer, rightContainerStyle]}>
          {renderRight({iconStyle: styles.icon})}
        </View>
      </View>
      <View style={styles.titleBar}>
        <Text numberOfLines={1} style={defaultContentStyle}>
          {content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 152,
    paddingTop: 20,
    paddingBottom: 28,
  },
  titleBar: {
    height: '50%',
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
  rightContainer: {
    flexDirection: 'row',
  },
});
