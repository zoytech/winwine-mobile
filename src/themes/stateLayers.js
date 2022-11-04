import hexToRgba from 'hex-to-rgba';
import Color, {ColorVariant} from './color';
import OpacityLevel from './opacityLevel';

const basePrimaryColor = Color.light[ColorVariant.primary]?.base;
const surfaceColor = Color.light[ColorVariant.surface]?.base;
const surfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.base;
const secondaryContainerColor = Color.light[ColorVariant.secondary]?.container;
const {opacity_008, opacity_012, opacity_016, opacity_032} = OpacityLevel;

const StateLayersVariant = {
  primary: 'primary',
  onPrimary: 'onPrimary',
  surface: 'surface',
  onSurface: 'onSurface',
  surfaceVar: 'surfaceVar',
  onSurfaceVar: 'onSurfaceVar',
  secondaryContainer: 'secondaryContainer',
  onSecondaryContainer: 'onSecondaryContainer',
};

//commment: state layer sẽ trừ đi lươơn opacity của màu đó

const StateLayers = {
  light: {
    [StateLayersVariant.primary]: {
      level_1000: basePrimaryColor,
      level_008: hexToRgba(basePrimaryColor, opacity_008),
      level_012: hexToRgba(basePrimaryColor, opacity_012),
      level_016: hexToRgba(basePrimaryColor, opacity_016),
      level_032: hexToRgba(basePrimaryColor, opacity_032),
    },
    [StateLayersVariant.onPrimary]: {
      level_100: basePrimaryColor,
      level_008: hexToRgba(basePrimaryColor, 1 - opacity_008),
      level_012: hexToRgba(basePrimaryColor, 1 - opacity_012),
      level_016: hexToRgba(basePrimaryColor, 1 - opacity_016),
      level_032: hexToRgba(basePrimaryColor, 1 - opacity_032),
    },
    [StateLayersVariant.secondaryContainer]: {
      level_100: secondaryContainerColor,
      level_008: hexToRgba(secondaryContainerColor, opacity_008),
      level_012: hexToRgba(secondaryContainerColor, opacity_012),
      level_016: hexToRgba(secondaryContainerColor, opacity_016),
      level_032: hexToRgba(secondaryContainerColor, opacity_032),
    },
    [StateLayersVariant.onSecondaryContainer]: {
      level_100: secondaryContainerColor,
      level_008: hexToRgba(secondaryContainerColor, 1 - opacity_008),
      level_012: hexToRgba(secondaryContainerColor, 1 - opacity_012),
      level_016: hexToRgba(secondaryContainerColor, 1 - opacity_016),
      level_032: hexToRgba(secondaryContainerColor, 1 - opacity_032),
    },
    [StateLayersVariant.surface]: {
      level_100: surfaceColor,
      level_008: hexToRgba(surfaceColor, opacity_008),
      level_012: hexToRgba(surfaceColor, opacity_012),
      level_016: hexToRgba(surfaceColor, opacity_016),
      level_032: hexToRgba(surfaceColor, opacity_032),
    },
    [StateLayersVariant.onSurface]: {
      level_100: surfaceColor,
      level_008: hexToRgba(surfaceColor, 1 - opacity_008),
      level_012: hexToRgba(surfaceColor, 1 - opacity_012),
      level_016: hexToRgba(surfaceColor, 1 - opacity_016),
      level_032: hexToRgba(surfaceColor, 1 - opacity_032),
    },
    [StateLayersVariant.surfaceVar]: {
      level_100: surfaceVarColor,
      level_008: hexToRgba(surfaceVarColor, opacity_008),
      level_012: hexToRgba(surfaceVarColor, opacity_012),
      level_016: hexToRgba(surfaceVarColor, opacity_016),
      level_032: hexToRgba(surfaceVarColor, opacity_032),
    },
    [StateLayersVariant.onSurfaceVar]: {
      level_100: surfaceVarColor,
      level_008: hexToRgba(surfaceVarColor, 1 - opacity_008),
      level_012: hexToRgba(surfaceVarColor, 1 - opacity_012),
      level_016: hexToRgba(surfaceVarColor, 1 - opacity_016),
      level_032: hexToRgba(surfaceVarColor, 1 - opacity_032),
    },
  },
};

export {StateLayersVariant};
export default StateLayers;
