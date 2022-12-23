import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {TextButton} from 'src/components';
import ActionContainer from './components/ActionContainer';

const actions = {
  REMOVE: 'Remove Download',
  PIN: 'Pin Card Deck',
  LIKE: 'Like',
  DELETE: 'Delete Card Deck',
};

export default function CreateActionScreen() {
  function renderListOfButtons() {
    const actionItemStyle = [styles.actionItem, {background: 'coral'}];
    return (
      <>
        <TextButton content={actions?.REMOVE} style={actionItemStyle} />
        <TextButton content={actions?.PIN} style={actionItemStyle} />
        <TextButton content={actions?.LIKE} style={actionItemStyle} />
        <TextButton content={actions?.DELETE} style={actionItemStyle} />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ActionContainer>
        <View style={styles.actions}>{renderListOfButtons()}</View>
      </ActionContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    backgroundColor: Color.light[ColorVariant.background].base,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'coral',
  },
  actionItem: {
    width: '100%',
    height: '25%',
  },
});
