import Surfaces, {SurfacesVariant} from '../../themes/surfaces';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

function SurfaceBase(props) {
  const {surfacesVariant, style} = props;
  const {first, second, third} = Surfaces.light[surfacesVariant];
  const boxStyle = [style];

  return (
    <LinearGradient
      colors={[first, second, third]}
      useAngle={true}
      angle={45}
      angleCenter={{x: 0.5, y: 0.5}}
      style={boxStyle}
    />
  );
}

function Surface1(props) {
  const {style} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface1} style={style} />
  );
}

function Surface2(props) {
  const {style} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface2} style={style} />
  );
}

function Surface3(props) {
  const {style} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface3} style={style} />
  );
}

function Surface4(props) {
  const {style} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface4} style={style} />
  );
}

function Surface5(props) {
  const {style} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface5} style={style} />
  );
}

export {Surface1, Surface2, Surface3, Surface4, Surface5};

export default SurfaceBase;
