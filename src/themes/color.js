const ColorVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  error: 'error',
  background: 'background',
  surface: 'surface',
  surfaceVariant: 'surfaceVariant',
  outline: 'outline',
  inverse: 'inverse',
};

const Color = {
  light: {
    [ColorVariant.primary]: {
      base: '#BA005E',
      onBase: '#FFFFFF',
      container: '#FFD9E1',
      onContainer: '#3F001B',
    },
    [ColorVariant.secondary]: {
      base: '#A62D75',
      onBase: '#FFFFFF',
      container: '#FFD8E7',
      onContainer: '#3D0027',
    },
    [ColorVariant.tertiary]: {
      base: '#754B9C',
      onBase: '#FFFFFF',
      container: '#F1DBFF',
      onContainer: '#2D0050',
    },
    [ColorVariant.error]: {
      base: '#C00001',
      onBase: '#FFFFFF',
      container: '#FFDAD4',
      onContainer: '#410000',
    },
    [ColorVariant.background]: {
      base: '#FFFBFF',
      onBase: '#201A1C',
    },
    [ColorVariant.surface]: {
      base: '#FFFBFF',
      onBase: '#1D1B1A',
    },
    [ColorVariant.surfaceVariant]: {
      base: '#F3DDE0',
      onBase: '#514346',
    },
    [ColorVariant.outline]: {base: '#837376'},
    [ColorVariant.inverse]: {
      surface: '#352F30',
      onSurface: '#FAEEF0',
      primary: '#FFB1C6',
    },
  },
  dark: {
    [ColorVariant.primary]: {
      base: '#FFB1C6',
      onBase: '#650030',
      container: '#8E0047',
      onContainer: '#FFD9E1',
    },
    [ColorVariant.secondary]: {
      base: '#FFAFD4',
      onBase: '#620041',
      container: '#870F5C',
      onContainer: '#FFD8E7',
    },
    [ColorVariant.tertiary]: {
      base: '#DEB7FF',
      onBase: '#44196A',
      container: '#5C3382',
      onContainer: '#F1DBFF',
    },
    [ColorVariant.error]: {
      base: '#FFB4A8',
      onBase: '#690000',
      container: '#930001',
      onContainer: '#FFDAD4',
    },
    [ColorVariant.background]: {
      base: '#201A1C',
      onBase: '#EBE0E1',
    },

    [ColorVariant.surface]: {
      base: '#201A1C',
      onBase: '#EBE0E1',
    },
    [ColorVariant.surfaceVariant]: {
      base: '#514346',
      onBase: '#D6C2C5',
    },
    [ColorVariant.outline]: {base: '#9E8C90'},
    [ColorVariant.inverse]: {
      surface: '#EBE0E1',
      onSurface: '#201A1C',
      primary: '#BA005E',
    },
  },
};

export {ColorVariant};
export default Color;
