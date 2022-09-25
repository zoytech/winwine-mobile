import {Text, View} from 'react-native';
import TextContent, {TextContentVariant} from './textStyle';

export default function TextItem(props) {
  const textStyle = TextContentVariant.short;
  const {content, contentStyle, containerStyle, ...otherProps} = props;
  const {base, onBase} = TextContent[textStyle];
  const container = [base, containerStyle];
  const text = [onBase, contentStyle];
  return (
    <View {...otherProps} style={container}>
      {content && <Text style={text}>{content}</Text>}
    </View>
  );
}
