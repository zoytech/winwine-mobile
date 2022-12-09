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
      base: '#FFB1C2',
      onBase: '#600F2C',
      container: '#7D2742',
      onContainer: '#FFD9E0',
    },
    [ColorVariant.secondary]: {
      base: '#E4BDC4',
      onBase: '#43292F',
      container: '#5B3F45',
      onContainer: '#FFD9E0',
    },
    [ColorVariant.tertiary]: {
      base: '#EDBE91',
      onBase: '#462A09',
      container: '#60401E',
      onContainer: '#FFDCBE',
    },
    [ColorVariant.error]: {
      base: '#FFB4AB',
      onBase: '#690005',
      container: '#93000A',
      onContainer: '#FFDAD6',
    },
    [ColorVariant.background]: {
      base: '#201A1B',
      onBase: '#ECE0E1',
    },

    [ColorVariant.surface]: {
      base: '#201A1B',
      onBase: '#ECE0E1',
    },
    [ColorVariant.surfaceVariant]: {
      base: '#514346',
      onBase: '#524345',
    },
    [ColorVariant.outline]: {base: '#9E8C8F'},
    [ColorVariant.inverse]: {
      surface: '#ECE0E0',
      onSurface: '#201A1B',
      primary: '#AE2954',
    },
  },
};

export {ColorVariant};
export default Color;
