const ColorVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  error: 'error',
  background: 'background',
  surface: 'surface',
  surfaceVariant: 'surfaceVariant',
  outline: 'outline',
  stateLayer: 'stateLayer',
};

const Color = {
  light: {
    [ColorVariant.primary]: {
      base: '#845400',
      onBase: '#FFFFFF',
      container: '#FFDDB5',
      onContainer: '#2A1800',
    },
    [ColorVariant.secondary]: {
      base: '#705B40',
      onBase: '#FFFFFF',
      container: '#FBDEBC',
      onContainer: '#271905',
    },
    [ColorVariant.tertiary]: {
      base: '#53643E',
      onBase: '#FFFFFF',
      container: '#D5EABA',
      onContainer: '#111F03',
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
      base: '#E8E1DD',
      onBase: '#4A4643',
    },
    [ColorVariant.outline]: {base: '#817568'},
  },
};

export {ColorVariant};
export default Color;

// const {opacity_100} = OpacityLevel;
// const RGBA = 'rgba(255, 255, 255, 1)';
// const Color = {
//   light: {
//     [ColorVariant.primary]: {
//       base: `rgba(255, 255, 255, ${opacity_100})`,
//       onBase: `rgba(255, 255, 255, ${opacity_100})`,
//       container: `rgba(255, 221, 182, ${opacity_100})`,
//       onContainer: `rgba(42, 24, 0, ${opacity_100})`,
//     },
//     [ColorVariant.secondary]: {
//       base: `rgba(112, 91, 64, ${opacity_100})`,
//       onBase: `rgba(255, 255, 255, ${opacity_100})`,
//       container: `rgba(252, 222, 188, ${opacity_100})`,
//       onContainer: `rgba(39, 25, 5, ${opacity_100})`,
//     },
//     [ColorVariant.tertiary]: {
//       base: `rgba(83, 100, 62, ${opacity_100})`,
//       onBase: `rgba(255, 255, 255, ${opacity_100})`,
//       container: `rgba(214, 233, 186, ${opacity_100})`,
//       onContainer: `rgba(18, 31, 3, ${opacity_100})`,
//     },
//     [ColorVariant.error]: {
//       base: `rgba(186, 26, 26, ${opacity_100})`,
//       onBase: `rgba(255, 255, 255, ${opacity_100})`,
//       container: `rgba(255, 218, 214, ${opacity_100})`,
//       onContainer: `rgba(65, 0, 2, ${opacity_100})`,
//     },
//     [ColorVariant.background]: {
//       base: `rgba(255, 251, 255, ${opacity_100})`,
//       onBase: `rgba(31, 27, 22, ${opacity_100})`,
//     },
//
//     [ColorVariant.surface]: {
//       base: `rgba(255, 251, 255, ${opacity_100})`,
//       onBase: `rgba(31, 27, 22, ${opacity_100})`,
//     },
//     [ColorVariant.surfaceVariant]: {
//       base: `rgba(255, 251, 255, ${opacity_100})`,
//       onBase: `rgba(80, 69, 57, ${opacity_100})`,
//     },
//     [ColorVariant.outline]: {
//       base: `rgba(130, 117, 104, ${opacity_100})`,
//     },
//   },
// };
