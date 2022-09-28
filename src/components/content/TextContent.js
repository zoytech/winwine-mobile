import {Text, View} from 'react-native';
import textTypeStyle from './textTypeStyle';

export default function TextContent(props) {
  const {content, contentStyle, ...otherProps} = props;
  const textStyle = [textTypeStyle.text, contentStyle];
  // const text = [onBase, contentStyle];
  return (
    <View {...otherProps}>
      {content && <Text style={textStyle}>{content}</Text>}
    </View>
  );
}

const contentttt = 'alalooa';
