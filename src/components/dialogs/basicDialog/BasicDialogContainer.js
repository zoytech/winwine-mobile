import {Dimensions, StyleSheet, View} from 'react-native';
import {StateLayers, StateLayersVariant} from 'src/themes';

const screenWidth = Dimensions.get('screen').width;

function BasicDialogContainer(props) {
  const {layoutStyle, children, ...otherProps} = props;

  const layoutColor =
    StateLayers.light[StateLayersVariant.onSurface]?.level_032;
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
    width: screenWidth,
    aspectRatio: 9 / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
