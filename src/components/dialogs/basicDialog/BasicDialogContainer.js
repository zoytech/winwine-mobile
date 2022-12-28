import {StyleSheet, View} from 'react-native';
import {StateLayers, StateLayersVariant} from 'src/themes';
import {WIDTH} from 'src/constants';

function BasicDialogContainer(props) {
  const {layoutStyle, children, ...otherProps} = props;

  const layoutColor = StateLayers.light[StateLayersVariant.surface]?.level_068;
  const containerStyle = [
    styles.container,
    {backgroundColor: layoutColor},
    layoutStyle,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}

export default BasicDialogContainer;

const styles = StyleSheet.create({
  container: {
    width: WIDTH.SCREEN,
    aspectRatio: 9 / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
