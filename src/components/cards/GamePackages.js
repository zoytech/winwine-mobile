import {FilledButton} from '../buttons';
import {StyleSheet, View} from 'react-native';
import {ColorVariant} from '../../themes/color';
import React from 'react';
import {Color, Typography} from '../../themes';
import {ImageContent} from '../content';
import {PreviewInfo} from '../headers';

export default function GamePackages(props) {
  const {
    colorSurfaceVariant = ColorVariant.surfaceVariant,
    typography = Typography.label.small,
    // colorPrimaryVariant = ColorVariant.primary,
    // colorOutlineVariant = ColorVariant.outline,

    ...otherProps
  } = props;
  const {base: cardBase} = Color.light[colorSurfaceVariant];
  const containerStyle = [styles.container, {backgroundColor: cardBase}];

  const contentStyle = [styles.displayContent];
  const headerStyle = [styles.displayHeader];
  const buttonStyle = [styles.displayButton];
  const imageStyle = [styles.image];
  const textStyle = [typography];

  const handlePressButton = () => {
    alert('Move to card package');
  };

  return (
    <View {...otherProps} style={containerStyle}>
      <ImageContent containerStyle={contentStyle} imageStyle={imageStyle} />
      <PreviewInfo style={headerStyle} />
      <View style={buttonStyle}>
        <FilledButton
          content={'Chơi ngay'}
          onPress={handlePressButton}
          contentStyle={textStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: 147,
    height: 197,
    borderRadius: 12,
    overflow: 'hidden',
  },

  displayContent: {
    flex: 6,
  },
  displayHeader: {
    flex: 2, // backgroundColor: 'coral',
  },

  displayButton: {
    flex: 2, // padding: 5,
    paddingBottom: 5,
    paddingHorizontal: 5,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, // image: {
  //     resizeMode: 'contain',
  //
  // }
});

//ratio: height/width of preview card = 1.34
