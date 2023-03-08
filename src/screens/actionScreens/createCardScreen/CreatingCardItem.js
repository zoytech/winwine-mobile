import {FilledCard} from 'src/components';
import {StyleSheet, Text} from 'react-native';

export default function CreatingCardItem(props) {
  const {content, style, contentStyle, ...otherProps} = props;
  return (
    <FilledCard {...otherProps} style={[styles.container, style]}>
      <Text style={[styles.cardContent, contentStyle]}>{content}</Text>
    </FilledCard>
  );
}
const styles = StyleSheet.create({
  container: {},
  contentStyle: {},
});
