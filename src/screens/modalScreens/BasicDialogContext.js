import {createContext} from 'react';
import {StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {BasicDialog} from 'src/components';

export default function BasicDialogProvider() {
  return (
    <BasicDialog.Container style={styles.layout}>
      <BasicDialog.Content />
    </BasicDialog.Container>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Color.light[ColorVariant.background].base,
  },
});
