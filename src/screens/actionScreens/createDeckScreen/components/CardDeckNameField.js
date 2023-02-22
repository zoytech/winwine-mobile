import {TextInputHolder} from './index';
import {StyleSheet, Text, View} from 'react-native';
import {useController} from 'react-hook-form';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function CardDeckNameField(props) {
  const {style, contentStyle, ...otherProps} = props;
  const onPrimary = Color.light[ColorVariant.primary]?.onBase;
  const headlineStyle = [contentStyle, Typography.title.large];

  return (
    <TextInputHolder
      {...otherProps}
      contentStyle={headlineStyle}
      selectTextOnFocus={true}
    />
  );
}
const styles = StyleSheet.create({
  textHolder: {
    borderWidth: 0.5,
  },
  button: {
    borderRadius: 0,
    width: 180,
    justifyContent: 'space-evenly',
  },
});
