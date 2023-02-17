import Color, {ColorVariant} from './color';
import hexToRgba from 'hex-to-rgba';
import OpacityLevel from './opacityLevel';

const lightColor = Color.light[ColorVariant.primary]?.base;
const darkColor = Color.dark[ColorVariant.primary]?.base;

const {opacity_005, opacity_008, opacity_011, opacity_012, opacity_014} =
  OpacityLevel;

const SurfacesColor = {
  light: {
    surface1: hexToRgba(lightColor, opacity_005),
    surface2: hexToRgba(lightColor, opacity_008),
    surface3: hexToRgba(lightColor, opacity_011),
    surface4: hexToRgba(lightColor, opacity_012),
    surface5: hexToRgba(lightColor, opacity_014),
  },
  dark: {
    surface1: hexToRgba(darkColor, opacity_005),
    surface2: hexToRgba(darkColor, opacity_008),
    surface3: hexToRgba(darkColor, opacity_011),
    surface4: hexToRgba(darkColor, opacity_012),
    surface5: hexToRgba(darkColor, opacity_014),
  },
};

export default SurfacesColor;
