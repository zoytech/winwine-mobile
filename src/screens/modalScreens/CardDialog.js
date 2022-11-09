import {LogBox, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {CardDialogContainer} from 'src/components';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function CardDialog({route}) {
  const {content} = route.params;
  return (
    <CardDialogContainer style={styles.layout}>{content}</CardDialogContainer>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Color.light[ColorVariant.background].base,
  },
});
