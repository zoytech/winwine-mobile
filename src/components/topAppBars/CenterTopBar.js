import React, {forwardRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components';
import {heightOf} from 'src/constants';

const standardHeight = heightOf?.MIN_HEADER;

function CenterTopBar(props, ref) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    onLayoutOfBottomComponent = () => {},
    RightComponents,
    children,
    style,
    contentStyle,
    headerTitleStyle,
    componentStyle,
    ...otherProps
  } = props;

  const {base: background, onBase: onBackground} =
    Color.light[ColorVariant.background];

  const defaultContainerStyle = [
    styles.container,
    {backgroundColor: background},
    style,
  ];

  const defaultContentStyle = [
    Typography.title.large,
    {color: onBackground},
    contentStyle,
  ];
  const defaultHeaderContentStyle = [styles.title, headerTitleStyle];
  const topBarComponentStyle = [styles.topBarComponent, componentStyle];

  function renderRights({iconStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof RightComponents === 'function') {
      return RightComponents({iconStyle});
    }
    return RightComponents;
  }

  function renderLeadingIcon() {
    return (
      <>
        {leadingIcon && (
          <View style={styles.targetSize}>
            <StandardIconButton
              name={leadingIcon}
              onPress={onLeadingIconPress}
              style={styles.icon}
            />
          </View>
        )}
      </>
    );
  }

  return (
    <Animated.ScrollView {...otherProps} style={defaultContainerStyle}>
      <Animated.View style={topBarComponentStyle}>
        {renderLeadingIcon()}
        <View style={defaultHeaderContentStyle}>
          <Text style={defaultContentStyle}>{content}</Text>
        </View>
        {renderRights({iconStyle: styles.avatarIcon})}
      </Animated.View>
      <Animated.View
        style={topBarComponentStyle}
        onLayout={event => onLayoutOfBottomComponent(event)}>
        {children}
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  item: {
    justifyContent: 'flex-start',
  },
  topBarComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: standardHeight,
  },
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 16,
  },
  avatarIcon: {
    borderRadius: 15,
    width: 30,
    height: 30,
  },
});

export default forwardRef(CenterTopBar);
