import hexToRgba from 'hex-to-rgba';
import Color, {ColorVariant} from './color';
import OpacityLevel from './opacityLevel';

const {base: basePrimary, onBase: onBasePrimary} =
  Color.light[ColorVariant.primary];
const {container: containerSec, onContainer: onContainerSec} =
  Color.light[ColorVariant.secondary];
const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
const {base: surfaceVar, onBase: onSurfaceVar} =
  Color.light[ColorVariant.surfaceVariant];
const {base: outline, onBase: onOutline} = Color.light[ColorVariant.outline];
const {
  surface: surfaceInv,
  onSurface: onSurfaceInv,
  primary: primaryInv,
} = Color.light[ColorVariant.inverse];

const {opacity_008, opacity_012, opacity_016, opacity_032, opacity_038} =
  OpacityLevel;

const StateLayersVariant = {
  primary: 'primary',
  onPrimary: 'onPrimary',
  surface: 'surface',
  onSurface: 'onSurface',
  surfaceVar: 'surfaceVar',
  onSurfaceVar: 'onSurfaceVar',
  outline: 'outline',
  onOutline: 'onOutline',
  secondaryContainer: 'secondaryContainer',
  onSecondaryContainer: 'onSecondaryContainer',
  surfaceInv: 'surfaceInv',
  onSurfaceInv: 'onSurfaceInv',
  primaryInv: 'primaryInv',
};

function generateStateLayerLevel(color) {
  const colorCode = color || '';
  return {
    level_008: hexToRgba(colorCode, opacity_008),
    level_012: hexToRgba(colorCode, opacity_012),
    level_016: hexToRgba(colorCode, opacity_016),
    level_032: hexToRgba(colorCode, opacity_032),
    level_038: hexToRgba(colorCode, opacity_038),
    level_068: hexToRgba(colorCode, 1 - opacity_032),
    level_084: hexToRgba(colorCode, 1 - opacity_016),
    level_088: hexToRgba(colorCode, 1 - opacity_012),
    level_092: hexToRgba(colorCode, 1 - opacity_008),
    level_100: hexToRgba(colorCode, 1),
  };
}

const StateLayers = {
  light: {
    [StateLayersVariant.primary]: {
      ...generateStateLayerLevel(basePrimary),
    },
    [StateLayersVariant.onPrimary]: {
      ...generateStateLayerLevel(onBasePrimary),
    },
    [StateLayersVariant.secondaryContainer]: {
      ...generateStateLayerLevel(containerSec),
    },
    [StateLayersVariant.onSecondaryContainer]: {
      ...generateStateLayerLevel(onContainerSec),
    },
    [StateLayersVariant.surface]: {
      ...generateStateLayerLevel(surface),
    },
    [StateLayersVariant.onSurface]: {
      ...generateStateLayerLevel(onSurface),
    },
    [StateLayersVariant.surfaceVar]: {
      ...generateStateLayerLevel(surfaceVar),
    },
    [StateLayersVariant.onSurfaceVar]: {
      ...generateStateLayerLevel(onSurfaceVar),
    },
    [StateLayersVariant.outline]: {
      ...generateStateLayerLevel(outline),
    },
    [StateLayersVariant.onOutline]: {
      ...generateStateLayerLevel(onOutline),
    },
    [StateLayersVariant.surfaceInv]: {
      ...generateStateLayerLevel(surfaceInv),
    },
    [StateLayersVariant.onSurfaceInv]: {
      ...generateStateLayerLevel(onSurfaceInv),
    },
    [StateLayersVariant.primaryInv]: {
      ...generateStateLayerLevel(primaryInv),
    },
  },
};

export {StateLayersVariant};
export default StateLayers;
