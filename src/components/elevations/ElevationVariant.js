import Surfaces from '../../themes/surfaces';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

function SurfaceItem(props) {
  const {surfacesVariant} = props;
  const {first, second, third} = Surfaces.light[surfacesVariant];
  const boxStyle = [styles.box];

  return (
    <LinearGradient
      colors={[first, second, third]}
      useAngle={true}
      angle={0}
      angleCenter={{x: 0, y: 0}}
      style={boxStyle}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    width: 216,
    height: 216,
  },
});

export default SurfaceItem;
