import Surfaces, {SurfacesVariant} from './surfaces';
import LinearGradient from 'react-native-linear-gradient';

function SurfaceBase(props) {
  const {surfacesVariant, style, children, ...otherProps} = props;
  const {first, second, third} = Surfaces.light[surfacesVariant];
  const boxStyle = [style];

  return (
    <LinearGradient
      colors={[first, second, third]}
      useAngle={true}
      angle={45}
      angleCenter={{x: 0.5, y: 0.5}}
      style={boxStyle}
      {...otherProps}>
      {children}
    </LinearGradient>
  );
}

function Surface1(props) {
  const {style, children} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface1} style={style}>
      {children}
    </SurfaceBase>
  );
}

function Surface2(props) {
  const {style, children} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface2} style={style}>
      {children}
    </SurfaceBase>
  );
}

function Surface3(props) {
  const {style, children} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface3} style={style}>
      {children}
    </SurfaceBase>
  );
}

function Surface4(props) {
  const {style, children} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface4} style={style}>
      {children}
    </SurfaceBase>
  );
}

function Surface5(props) {
  const {style, children} = props;
  return (
    <SurfaceBase surfacesVariant={SurfacesVariant.surface5} style={style}>
      {children}
    </SurfaceBase>
  );
}

export {Surface1, Surface2, Surface3, Surface4, Surface5};

export default SurfaceBase;
