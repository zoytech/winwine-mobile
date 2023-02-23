import {TextInputHolder} from './index';
import {StyleSheet, Text, View} from 'react-native';
import {useController} from 'react-hook-form';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function CardDeckNameField(props) {
  const {style, contentStyle, ...otherProps} = props;
  const onPrimary = Color.light[ColorVariant.primary]?.onBase;

  return (
    <TextInputHolder
      {...otherProps}
      contentStyle={contentStyle}
      selectTextOnFocus={true}
    />
  );
}
const styles = StyleSheet.create({
  textHolder: {
    borderWidth: 0.5,
  },
});
