import {Pressable, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function SelectedPlaceholder(props) {
  const {children, style, selected = false, ...otherProps} = props;
  const {base: selectedBorderColor, onBase: normBorderColor} =
    Color.light[ColorVariant.primary];

  function getContainerStyle({pressed}) {
    return [
      {
        borderColor: selected ? selectedBorderColor : normBorderColor,
        borderWidth: selected ? 2 : 0.5,
      },
      pressed && styles.opacityPressed,
      style,
    ];
  }

  return (
    <Pressable {...otherProps} style={getContainerStyle}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floating: {},
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});
