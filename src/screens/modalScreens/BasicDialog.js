import {createContext, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function BasicDialog({children}) {
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
