import {StyleSheet, Text, View} from 'react-native';
import {TextButton} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

const CONTENT = {
  STOP: 'Huỷ',
  SAVE: 'Lưu',
  HEADLINE: 'Tạo bộ bài',
};

export default function HeaderActionButtons(props) {
  const {
    style,
    contentStyle,
    disabled = false,
    onSubmit = () => {},
    onStopPress = () => {},
    ...otherProps
  } = props;
  const defaultContainerStyle = [styles.container, style];
  const onBackgroundColor = Color.light[ColorVariant.background]?.onBase;
  const onSurfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const primaryColor = Color.light[ColorVariant.primary]?.base;

  const leftButtonStyle = [
    Typography.label.large,
    {color: onSurfaceVarColor},
    contentStyle,
  ];
  const rightButtonStyle = [
    Typography.label.large,
    {color: primaryColor},
    contentStyle,
  ];
  const headlineStyle = [
    Typography.title.large,
    {color: onBackgroundColor},
    contentStyle,
  ];

  return (
    <View {...otherProps} style={defaultContainerStyle}>
      <TextButton
        content={CONTENT.STOP}
        onPress={onStopPress}
        contentStyle={leftButtonStyle}
      />
      <View>
        <Text style={headlineStyle}>{CONTENT.HEADLINE}</Text>
      </View>
      <TextButton
        content={CONTENT.SAVE}
        contentStyle={rightButtonStyle}
        disabled={disabled}
        onPress={onSubmit}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
