import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function InfoProgressIndicator(props) {
  const {
    content,
    progressBarWidth,
    indicatedArrowWidth,
    indicatedPartWidth,
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;
  const {base: baseColor, onBase: onBaseColor} =
    Color.light[ColorVariant.primary];

  const outlineColor = Color.light[ColorVariant.outline];
  const contentContainerStyle = [
    styles.contentContainer,
    {backgroundColor: onBaseColor, borderColor: outlineColor, borderWidth: 0.5},
  ];
  const defaultContainerStyle = [
    styles.container,
    {width: progressBarWidth + indicatedArrowWidth * 2},
    style,
  ];
  const defaultContentStyle = [
    contentStyle,
    Typography.label.medium,
    {color: baseColor},
  ];
  const indicatorSliderStyle = [
    styles.slider,
    {width: indicatedArrowWidth * 2 + indicatedPartWidth * 2},
  ];

  const iconProps = {
    name: 'down',
    color: baseColor,
    size: 12,
  };

  return (
    <View {...otherProps} style={defaultContainerStyle}>
      <View style={indicatorSliderStyle}>
        <View style={styles.component}>
          <View style={contentContainerStyle}>
            {content && <Text style={defaultContentStyle}>{content}</Text>}
          </View>
          <View style={styles.iconContainer}>
            <Icon {...iconProps} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  slider: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  component: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
/*
<View style={iconContainerStyle}>
          <Icon {...iconProps} />
        </View>
 */
