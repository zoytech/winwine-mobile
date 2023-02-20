import {StyleSheet, TextInput, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function TextInputHolder(props) {
  const {style, contentStyle, ...otherProps} = props;
  const {onBase: onPrimaryColor, onContainer: onContainer} =
    Color.light[ColorVariant.primary];
  // const secondaryColor = Color.light[ColorVariant.secondary]?.container;
  const containerStyle = [
    styles.container,
    {borderBottomColor: onPrimaryColor},
    style,
  ];
  return (
    <View style={containerStyle}>
      <TextInput
        {...otherProps}
        selectionColor={onContainer}
        style={contentStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    width: 250,
  },
});
