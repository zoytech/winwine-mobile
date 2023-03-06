import {FilledCard} from 'src/components';
import {StyleSheet, Text} from 'react-native';

export default function CreatingCardList(props) {
  const {content, key, style, contentStyle, ...otherProps} = props;
  return (
    <FilledCard {...otherProps} key={key} style={[styles.container, style]}>
      <Text style={[styles.cardContent, contentStyle]}>{content}</Text>
    </FilledCard>
  );
}
const styles = StyleSheet.create({
  container: {},
  contentStyle: {},
});
