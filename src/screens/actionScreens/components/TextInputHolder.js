import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Typography, Color, ColorVariant} from 'src/themes';
import ValidationText from './ValidationText';

export default function TextInputHolder(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    maxLength,
    placeholder = '',
    required = false,
    style,
    contentStyle,
    ...otherProps
  } = props;

  const {base: backgroundColor, onContainer: onBackgroundColor} =
    Color.light[ColorVariant.background];
  const outlineColor = Color.light[ColorVariant.outline]?.base;
  const onSurfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const containerStyle = [styles.container, {borderColor: outlineColor}, style];
  const requiredStyle = [{color: onSurfaceVarColor}, Typography.body.small];
  const hasError = errors[name] && touched[name];
  const rightContent = `${value?.length}/${maxLength}`;
  const requiredSymbol = required ? '*' : '';

  function handleChangeText(text) {
    onChange(name)(text);
  }

  function handleBlur() {
    setFieldTouched(name);
    onBlur(name);
  }

  function renderSubDescriptionText() {
    return (
      <View style={styles.subDescriptionContainer}>
        <View style={styles.subDescriptionItem}>
          {hasError && <ValidationText content={errors[name]} />}
        </View>
        <View style={styles.subDescriptionItem}>
          {maxLength && <Text style={requiredStyle}>{rightContent}</Text>}
        </View>
      </View>
    );
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
            placeholder={`${placeholder}${requiredSymbol}`}
            selectionColor={onBackgroundColor}
            style={contentStyle}
            selectTextOnFocus={true}
            multiline={true}
            maxLength={maxLength}
          />
        </View>
      </View>
      {renderSubDescriptionText()}
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
  subDescriptionItem: {
    alignSelf: 'flex-end',
  },
  subDescriptionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
});
