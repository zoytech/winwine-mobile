import {StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {TextInputHolder} from 'src/screens/actionScreens/components';

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
