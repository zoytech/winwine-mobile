import {StyleSheet, View} from 'react-native';
import ArrowIndicator from './ArrowIndicator';

export default function IndicatorTrace(props) {
  const {
    content,
    endContent,
    progressBarWidth,
    indicatedArrowWidth,
    indicatedPartWidth,
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;

  const defaultContainerStyle = [
    styles.container,
    {width: progressBarWidth + indicatedArrowWidth * 10},
    style,
  ];
  const indicatorSliderStyle = [
    styles.slider,
    {
      width: indicatedArrowWidth * 10 + indicatedPartWidth * 2,
    },
  ];

  return (
    <View {...otherProps} style={defaultContainerStyle}>
      <View style={indicatorSliderStyle}>
        <ArrowIndicator
          content={content}
          contentStyle={contentStyle}
          style={style}
        />
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
    flexDirection: 'row',
  },
});
