import {Animated, StyleSheet, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function SmallTopBar(props) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    onLayoutTopAppBar = () => {},
    topHeight,
    bottomHeight,
    style,
    contentStyle,
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
    {
      color: contentColor,
    },
    contentStyle,
  ];

  const topPartStyle = [styles.topPart, {height: topHeight}];

  function renderRight({iconStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof RightComponents === 'function') {
      return RightComponents({iconStyle});
    }
    return RightComponents;
  }

  function renderCenter({centerStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof CenterComponents === 'function') {
      return CenterComponents({centerStyle});
    }
    return CenterComponents;
  }

  return (
    <Animated.View
      {...otherProps}
      style={containerStyle}
      onLayout={e => onLayoutTopAppBar(e)}>
      <Animated.View style={topPartStyle}>
        <StandardIconButton
          name={leadingIcon}
          onPress={onLeadingIconPress}
          style={styles.icon}
        />
        {content && (
          <Animated.Text numberOfLines={1} style={defaultContentStyle}>
            {content}
          </Animated.Text>
        )}
        <View style={[styles.rightContainer]}>
          {renderRight({iconStyle: styles.icon})}
        </View>
      </Animated.View>
      {renderCenter({centerStyle: styles.bottomPart})}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topPart: {
    width: '100%',
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
    paddingRight: 16,
  },
  bottomPart: {
    width: '100%',
    alignItems: 'center',
  },
  centerItem: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'red',
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
