import Color, {ColorVariant} from './color';
import hexToRgba from 'hex-to-rgba';
import OpacityLevel from './opacityLevel';

const baseColor = Color.light[ColorVariant.primary]?.base;
const {opacity_005, opacity_008, opacity_011, opacity_012, opacity_014} =
  OpacityLevel;

const SurfacesColor = {
  light: {
    surface1: hexToRgba(baseColor, opacity_005),
    surface2: hexToRgba(baseColor, opacity_008),
    surface3: hexToRgba(baseColor, opacity_011),
    surface4: hexToRgba(baseColor, opacity_012),
    surface5: hexToRgba(baseColor, opacity_014),
  },
  elevation: {
    surface1: hexToRgba(baseColor, 1 - opacity_005),
    surface2: hexToRgba(baseColor, 1 - opacity_008),
    surface3: hexToRgba(baseColor, 1 - opacity_011),
    surface4: hexToRgba(baseColor, 1 - opacity_012),
    surface5: hexToRgba(baseColor, 1 - opacity_014),
  },
};

export default SurfacesColor;
