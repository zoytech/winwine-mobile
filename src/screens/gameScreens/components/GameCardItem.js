import {StyleSheet, Text} from 'react-native';
import {FilledCard} from 'src/components';
import {Typography} from 'src/themes';

export default function GameCardItem(props) {
  const {content, index, style, contentStyle, itemWidth, ...otherProps} = props;
  const containerStyle = [styles.container, {width: itemWidth}, style];
  const defaultContentStyle = [
    Typography.body.large,
    styles.text,
    contentStyle,
  ];
  return (
    <FilledCard {...otherProps} style={containerStyle}>
      {content && <Text style={defaultContentStyle}>{content}</Text>}
    </FilledCard>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 32,
    height: '100%',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
