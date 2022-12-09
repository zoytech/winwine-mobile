import {StyleSheet, Text} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function TabScreenLabel(props) {
  const {content, focused} = props;
  const onSurVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const onSurfaceColor = Color.light[ColorVariant.surface]?.onBase;
  const labelColor = focused ? onSurfaceColor : onSurVarColor;
  const labelStyle = [
    Typography.label.medium,
    {color: labelColor},
    styles.label,
  ];

  return <Text style={labelStyle}>{content}</Text>;
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
