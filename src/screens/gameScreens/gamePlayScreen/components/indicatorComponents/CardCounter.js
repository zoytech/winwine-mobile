import {StyleSheet, Text, View} from 'react-native';

export default function CardCounter(props) {
  const {content, counterSize, style, contentStyle, ...otherProps} = props;
  const defaultContainerStyle = [
    styles.counter,
    {width: counterSize, borderRadius: counterSize && counterSize / 2},
    style,
  ];
  const defaultContentStyle = [contentStyle, styles.counterText];

  return (
    <View {...otherProps} style={defaultContainerStyle}>
      <Text style={defaultContentStyle}>{content}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  counter: {
    aspectRatio: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  counterText: {
    fontWeight: 'bold',
  },
});
