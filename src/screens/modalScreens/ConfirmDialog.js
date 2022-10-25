import {BasicDialog, TextButton, TonalButton} from 'src/components';
import {View, StyleSheet, Dimensions} from 'react-native';
import {StateLayers, StateLayersVariant} from '../../themes';

const screenWidth = Dimensions.get('screen').width;

export default function ConfirmDialog({routes, navigation}) {
  const layoutColor =
    StateLayers.light[StateLayersVariant.onSurface]?.level_032;
  return (
    <View style={[styles.container, {backgroundColor: layoutColor}]}>
      <BasicDialog
        icon={'pause'}
        headline={'GAME PAUSED'}
        supportingText={
          'Do you want to paufaffj ahfh afhj hakfhj afjh ajfh afjha jf jafj jafj fajhjhhh afjf jahfh jh jfhJ HF AJF JAFJAHFFJfj aghj faj'
        }
        hasDivider={true}>
        <TextButton content={'EXIT'} />
        <TextButton content={'RESTART'} />
        <TonalButton content={'RESUME'} />
      </BasicDialog>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    aspectRatio: 9 / 18,
    justifyContent: 'center',
  },
});
