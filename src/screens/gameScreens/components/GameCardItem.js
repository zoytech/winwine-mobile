import {Pressable, StyleSheet, Text} from 'react-native';
import {FilledCard} from 'src/components';
import {Typography} from 'src/themes';

export default function GameCardItem(props) {
  const {
    content,
    index,
    style,
    contentStyle,
    onPress = () => {},
    ...otherProps
  } = props;
  const containerStyle = [styles.container, style];
  return (
    <Pressable onPress={() => onPress(index)}>
      <FilledCard {...otherProps} style={containerStyle}>
        <Text style={[Typography.body.large, contentStyle]}>{content}</Text>
      </FilledCard>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
});
