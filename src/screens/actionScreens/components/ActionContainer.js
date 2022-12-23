import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {widthOf} from 'src/constants';
import {StateLayers, StateLayersVariant} from 'src/themes';

export default function ActionContainer(props) {
  const {children, ...otherProps} = props;
  const layoutColor = StateLayers.light[StateLayersVariant.surface]?.level_068;
  const backgroundStyle = [styles.container, {backgroundColor: layoutColor}];
  return (
    <SafeAreaView style={backgroundStyle}>
      <Pressable {...otherProps} style={backgroundStyle}>
        {children}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthOf.SCREEN,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
