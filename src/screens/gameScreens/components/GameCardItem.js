import {StyleSheet, Text} from 'react-native';
import {FilledCard} from 'src/components';
import {Typography} from 'src/themes';

export default function GameCardItem(props) {
  const {content, style, contentStyle, ...otherProps} = props;
  const containerStyle = [styles.container, style];
  return (
    <FilledCard {...otherProps} style={containerStyle}>
      <Text style={[Typography.body.large, contentStyle]}>{content}</Text>
    </FilledCard>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
});
