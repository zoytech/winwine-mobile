import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function ArrowIndicator(props) {
  const {content, contentStyle, style} = props;
  const {base: baseColor, onBase: onBaseColor} =
    Color.light[ColorVariant.primary];
  const outlineColor = Color.light[ColorVariant.outline];

  const defaultContainerStyle = [
    styles.contentContainer,
    {
      backgroundColor: onBaseColor,
      borderColor: outlineColor,
      borderWidth: 0.5,
    },
    style,
  ];
  const defaultContentStyle = [
    Typography.label.medium,
    {color: baseColor},
    contentStyle,
  ];
  const iconProps = {
    name: 'down',
    color: baseColor,
    size: 12,
  };
  return (
    <View style={styles.component}>
      <View style={defaultContainerStyle}>
        {content && <Text style={defaultContentStyle}>{content}</Text>}
      </View>
      <View style={styles.iconContainer}>
        <Icon {...iconProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  contentContainer: {
    minWidth: 30,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
});
