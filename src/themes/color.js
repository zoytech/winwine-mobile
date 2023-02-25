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
      base: '#9B3F5A',
      onBase: '#FFFFFF',
      container: '#FFD9E0',
      onContainer: '#3F0018',
    },
    [ColorVariant.secondary]: {
      base: '#75565C',
      onBase: '#FFFFFF',
      container: '#FFD9E0',
      onContainer: '#2B151A',
    },
    [ColorVariant.tertiary]: {
      base: '#7B5733',
      onBase: '#FFFFFF',
      container: '#FFDCBE',
      onContainer: '#2C1600',
    },
    [ColorVariant.error]: {
      base: '#BA1A1A',
      onBase: '#FFFFFF',
      container: '#FFDAD6',
      onContainer: '#410002',
    },
    [ColorVariant.background]: {
      base: '#FFFBFF',
      onBase: '#1D1B1A',
    },
    [ColorVariant.surface]: {
      base: '#FFFBFF',
      onBase: '#1D1B1A',
    },
    [ColorVariant.surfaceVariant]: {
      base: '#F3DDE0',
      onBase: '#4A4643',
    },
    [ColorVariant.outline]: {base: '#817568'},
    [ColorVariant.inverse]: {
      surface: '#352F30', //20
      onSurface: '#FAEEEF', //95
      primary: '#FFB1C0', //80
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
