import {TextInputHolder} from './index';
import {StyleSheet, View, Text} from 'react-native';
import {Color, ColorVariant} from '../../../../themes';

export default function DescriptionField(props) {
  const {name, style, contentStyle} = props;
  const onPrimary = Color.light[ColorVariant.primary]?.onBase;

  return (
    <View style={style}>
      <Text>{name}</Text>
      <TextInputHolder
        style={styles.textHolder}
        multiline={true}
        contentStyle={contentStyle}
        selectTextOnFocus={true}
      />
    </View>
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
