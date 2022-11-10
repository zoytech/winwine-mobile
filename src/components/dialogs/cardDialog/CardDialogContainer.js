import {Dimensions, StyleSheet, View} from 'react-native';
import {StateLayers, StateLayersVariant} from 'src/themes';

const screenWidth = Dimensions.get('screen').width;

function CardDialogContainer(props) {
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

export default CardDialogContainer;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    aspectRatio: 9 / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
