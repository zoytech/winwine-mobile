const ColorVariant = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    error: 'error',
    background: 'background',
    surface: 'surface',
    surfaceVariant: 'surfaceVariant',
    outline: 'outline',
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
