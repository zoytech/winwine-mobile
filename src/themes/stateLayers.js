import hexToRgba from 'hex-to-rgba';
import Color, {ColorVariant} from './color';
import OpacityLevel from './opacityLevel';

const {base: basePrimary} = Color.light[ColorVariant.primary];
const {onBase: onSurface} = Color.light[ColorVariant.surface];
const {container: containerSecondary} = Color.light[ColorVariant.secondary];
const {opacity_008, opacity_012, opacity_016, opacity_032} = OpacityLevel;

const StateLayersVariant = {
  primary: 'primary',
  onPrimary: 'onPrimary',
  onSurface: 'onSurface',
  onSecondary: 'onSecondary',
};

const StateLayers = {
  light: {
    [StateLayersVariant.primary]: {
      level_1000: hexToRgba(basePrimary, 0),
      level_008: hexToRgba(basePrimary, opacity_008),
      level_012: hexToRgba(basePrimary, opacity_012),
      level_016: hexToRgba(basePrimary, opacity_016),
      level_032: hexToRgba(basePrimary, opacity_032),
    },
    [StateLayersVariant.onPrimary]: {
      level_100: basePrimary,
      level_008: hexToRgba(basePrimary, 1 - opacity_008),
      level_012: hexToRgba(basePrimary, 1 - opacity_012),
      level_016: hexToRgba(basePrimary, 1 - opacity_016),
      level_032: hexToRgba(basePrimary, 1 - opacity_032),
    },
    [StateLayersVariant.onSecondary]: {
      level_100: containerSecondary,
      level_008: hexToRgba(containerSecondary, 1 - opacity_008),
      level_012: hexToRgba(containerSecondary, 1 - opacity_012),
      level_016: hexToRgba(containerSecondary, 1 - opacity_016),
      level_032: hexToRgba(containerSecondary, 1 - opacity_032),
    },
    [StateLayersVariant.onSurface]: {
      level_100: onSurface,
      level_008: hexToRgba(onSurface, opacity_008),
      level_012: hexToRgba(onSurface, opacity_012),
      level_016: hexToRgba(onSurface, opacity_016),
      level_032: hexToRgba(onSurface, opacity_032),
    },
  },
};

export {StateLayersVariant};
export default StateLayers;
