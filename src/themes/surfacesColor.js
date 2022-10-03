import {Color, ColorVariant} from './index';

const baseColor = Color.light[ColorVariant.primary]?.base;

const SurfacesColor = {
  light: {
    surface1: {
      base: baseColor,
      opacity: 0.05,
    },
    surface2: {
      base: baseColor,
      opacity: 0.08,
    },
    surface3: {
      base: baseColor,
      opacity: 0.11,
    },
    surface4: {
      base: baseColor,
      opacity: 0.12,
    },
    surface5: {
      base: baseColor,
      opacity: 0.14,
    },
  },
};
export default SurfacesColor;
