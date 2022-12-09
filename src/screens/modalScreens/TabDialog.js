import {LogBox, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {BasicDialogContainer} from 'src/components';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function TabDialog({route}) {
  const {content} = route.params;
  return (
    <BasicDialogContainer style={styles.layout}>{content}</BasicDialogContainer>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Color.light[ColorVariant.background].base,
  },
});
