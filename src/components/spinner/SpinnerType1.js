import Spinner from 'react-native-spinkit';
import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function SpinnerType1(props) {
  const {
    content,
    colorVariant = ColorVariant.secondary,
    typography = Typography.body.medium,
    style,
    contentStyle,
    isVisible,
    ...otherProps
  } = props;
  const {container, onContainer} = Color.light[colorVariant];
  const containerStyle = [
    styles.container,
    {backgroundColor: container, opacity: 0.5},
    style,
  ];
  const textStyle = [typography, {color: onContainer}];
  const spinnerProps = {
    isVisible: true,
    size: 37,
    type: 'ThreeBounce',
    color: onContainer,
  };
  return (
    <View {...otherProps} style={containerStyle}>
      <Spinner {...spinnerProps} />
      <Text style={textStyle}>{'Loading...'}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
