import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

function BoxShadow(props) {
  const {style} = props;
  const white15 = 'rgba(0, 0, 0, 0.3)';
  const white30 = 'rgba(0, 0, 0, 0.15)';
  const boxStyle = [styles.box, style];

  return (
    <LinearGradient
      colors={[white15, white30]}
      useAngle={true}
      angle={45}
      angleCenter={{x: 0.5, y: 0.5}}
      style={boxStyle}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 16,
  },
});

export default BoxShadow;
