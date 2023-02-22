import {StyleSheet, TextInput, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import ValidationText from '../../components/ValidationText';

export default function TextInputHolder(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    style,
    contentStyle,
    ...otherProps
  } = props;

  const {onBase: onPrimaryColor, onContainer: onContainerColor} =
    Color.light[ColorVariant.primary];

  const containerStyle = [
    styles.container,
    {borderBottomColor: onPrimaryColor},
    style,
  ];
  const hasError = errors[name] && touched[name];

  function handleChangeText(text) {
    onChange(name)(text);
  }

  function handleBlur() {
    setFieldTouched(name);
    onBlur(name);
  }

  return (
    <View style={containerStyle}>
      <TextInput
        {...otherProps}
        value={value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        selectionColor={onContainerColor}
        style={contentStyle}
      />
      {hasError && <ValidationText content={errors[name]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    width: 250,
  },
});
