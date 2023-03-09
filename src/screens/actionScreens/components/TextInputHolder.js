import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';

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

  const hasError = errors[name] && touched[name];
  const rightContent = `${value?.length}/${maxLength}`;
  const requiredSymbol = required ? '*' : '';
  const errorColor = Color.light[ColorVariant.error]?.base;
  const backgroundColor = Color.light[ColorVariant.background]?.base;
  const {base: surfaceVarColor, onBase: onSurfaceVarColor} =
    Color.light[ColorVariant.surfaceVariant];
  const outlineColor = Color.light[ColorVariant.outline]?.base;

  const iconProps = {
    name: 'exclamationcircle',
    size: 24,
    color: errorColor,
  };
  const containerStyle = [
    styles.textInputContainer,
    {
      borderColor: hasError ? errorColor : outlineColor,
      backgroundColor: backgroundColor,
    },
  ];
  const labelTextContainerStyle = [
    styles.labelTextContainer,
    {backgroundColor: backgroundColor},
  ];

  const defaultContentStyle = [
    styles.content,
    {color: hasError ? errorColor : onSurfaceVarColor},
    contentStyle,
  ];
  const mainTextStyle = [defaultContentStyle, {color: onSurfaceVarColor}];
  const subDescriptionStyle = [defaultContentStyle, Typography.body.small];

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
          {hasError && <Text style={subDescriptionStyle}>{errors[name]}</Text>}
        </View>
        <View style={styles.subDescriptionItem}>
          {maxLength && <Text style={subDescriptionStyle}>{rightContent}</Text>}
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={containerStyle}>
        {hasError && (
          <View style={labelTextContainerStyle}>
            <Text style={subDescriptionStyle}>{placeholder}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <TextInput
            {...otherProps}
            value={value}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            placeholder={`${placeholder}${requiredSymbol}`}
            placeholderTextColor={onSurfaceVarColor}
            style={[mainTextStyle, Typography.body.large]}
            selectTextOnFocus={true}
            maxLength={maxLength}
            selectionColor={surfaceVarColor}
            cursorColor={onSurfaceVarColor}
          />
        </View>
        {hasError && (
          <View style={styles.iconContainer}>
            <Icon {...iconProps} />
          </View>
        )}
      </View>
      {renderSubDescriptionText()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInputContainer: {
    borderWidth: 0.5,
    width: 328,
    aspectRatio: 5.75,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  labelTextContainer: {
    top: -8,
    left: 16,
    position: 'absolute',
    paddingHorizontal: 4,
  },
  textContainer: {
    width: '90%',
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
  iconContainer: {},
});
