import {StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {BasicDialog} from 'src/components';

export default function BasicDialogM({route}) {
  const content = route.params;
  return (
    <BasicDialog.Container style={styles.layout}>
      {content}
    </BasicDialog.Container>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Color.light[ColorVariant.background].base,
  },
});
