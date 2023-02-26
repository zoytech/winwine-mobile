module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          // define aliases to shorten the import paths
          'src/components': './src/components',
          'src/constants': './src/constants',
          'src/navigations': './src/navigations',
          'src/services': './src/services',
          'src/themes': './src/themes',
          'src/assets': './src/assets',
          'src/apis': './src/apis',
          'src/screens': './src/screens',
          'src/redux': './src/redux',
          'src/utils': './src/utils',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
