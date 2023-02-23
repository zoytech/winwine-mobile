import {TextInputHolder} from './index';
import {StyleSheet, View, Text} from 'react-native';
import {Color, ColorVariant} from '../../../../themes';

export default function DescriptionField(props) {
  const {style, contentStyle, ...otherProps} = props;
  const onPrimary = Color.light[ColorVariant.primary]?.onBase;

  return (
    <TextInputHolder
      {...otherProps}
      multiline={true}
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
