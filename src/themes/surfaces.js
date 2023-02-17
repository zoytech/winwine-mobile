import Color, {ColorVariant} from './color';
import hexToRgba from 'hex-to-rgba';
import OpacityLevel from './opacityLevel';

const baseColor = Color.light[ColorVariant.primary]?.base;
const {opacity_005, opacity_008, opacity_011, opacity_012, opacity_014} =
  OpacityLevel;

const Surfaces = {
  light: {
    surface: {
      third: '#FFFBFF',
    },
    surface1: {
      first: hexToRgba(baseColor, opacity_005),
      second: hexToRgba(baseColor, opacity_005),
      third: '#FFFBFF',
    },
    surface2: {
      first: hexToRgba(baseColor, opacity_008),
      second: hexToRgba(baseColor, opacity_008),
      third: '#FFFBFF',
    },
    surface3: {
      first: hexToRgba(baseColor, opacity_011),
      second: hexToRgba(baseColor, opacity_011),
      third: '#FFFBFF',
    },
    surface4: {
      first: hexToRgba(baseColor, opacity_012),
      second: hexToRgba(baseColor, opacity_012),
      third: '#FFFBFF',
    },
    surface5: {
      first: hexToRgba(baseColor, opacity_014),
      second: hexToRgba(baseColor, opacity_014),
      third: '#FFFBFF',
    },
  },
};
export default Surfaces;
