import {StyleSheet, TextInput, View, Text} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import ValidationText from './ValidationText';

export default function TextInputHolder(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    limitContent,
    leftContent,
    style,
    contentStyle,
    ...otherProps
  } = props;

  const {base: backgroundColor, onContainer: onBackgroundColor} =
    Color.light[ColorVariant.background];
  const outlineColor = Color.light[ColorVariant.outline]?.base;

  const containerStyle = [styles.container, {borderColor: outlineColor}, style];
  const hasError = errors[name] && touched[name];
  const rightContent = `(${value?.length}/${limitContent})`;

  function handleChangeText(text) {
    onChange(name)(text);
  }

  function handleBlur() {
    setFieldTouched(name);
    onBlur(name);
  }

  return (
    <>
      <View style={containerStyle}>
        <View style={styles.textInputContainer}>
          <TextInput
            {...otherProps}
            value={value}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            placeholder={leftContent}
            selectionColor={onBackgroundColor}
            style={contentStyle}
            selectTextOnFocus={true}
            multiline={true}
          />
        </View>
        <Text style={contentStyle}>{rightContent}</Text>
      </View>
      {hasError && <ValidationText content={errors[name]} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    width: '100%',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInputContainer: {
    width: 226,
  },
});
