import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Color, ColorVariant, Typography} from 'src/themes';
import {
  FilledButton,
  FilledIconButton,
  OutlinedButton,
  OutlinedCard,
} from 'src/components';

export default function CardDialogContent(props) {
  const {
    headline,
    subHeadLeft,
    subHeadRight,
    media,
    supportingText,
    mainAction,
    subAction,
    onMainActionPress,
    onSubActionPress,
    style,
    ...otherProps
  } = props;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  function renderHeaderComponent() {
    const headlineProps = {
      style: [Typography.title.large, {color: textColor}],
      numberOfLines: 1,
      ellipsizeMode: 'tail',
    };
    const subHeadProps = {
      style: [Typography.title.medium, {color: textColor}],
    };
    return (
      <View style={styles.header}>
        <View style={styles.leadingIcon}>
          <FilledIconButton style={styles.buttonIconArea} />
        </View>
        <View style={styles.content}>
          {headline && <Text {...headlineProps}>{headline}</Text>}
          <View style={styles.subHead}>
            {subHeadLeft && <Text {...subHeadProps}>{subHeadLeft}</Text>}
            {subHeadRight && <Text {...subHeadProps}>{subHeadRight}</Text>}
          </View>
        </View>
      </View>
    );
  }

  function renderBottomButtons() {
    return (
      <View style={styles.action}>
        {subAction && (
          <OutlinedButton
            content={subAction}
            onPress={onSubActionPress}
            style={styles.button}
          />
        )}
        {mainAction && (
          <FilledButton
            content={mainAction}
            contentStyle={Typography.label.large}
            onPress={onMainActionPress}
            style={styles.button}
          />
        )}
      </View>
    );
  }

  return (
    <OutlinedCard {...otherProps} style={[styles.container, style]}>
      {renderHeaderComponent()}
      <Image style={styles.media} source={media} />
      <View style={styles.supportingText}>
        {supportingText && (
          <Text style={[Typography.title.medium, {color: textColor}]}>
            {supportingText}
          </Text>
        )}
      </View>
      {renderBottomButtons()}
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  header: {
    width: '100%',
    aspectRatio: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  media: {
    width: '100%',
    aspectRatio: 1.2,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    height: 40,
    paddingHorizontal: 0,
  },
  leadingIcon: {
    width: '12%',
    justifyContent: 'center',
  },
  content: {
    width: '75%',
    aspectRatio: 4.4,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  subHead: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonIconArea: {
    width: 12,
    height: 12,
  },
});
