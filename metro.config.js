/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// get defaults assetExts array
const defaultAssetExts =
  require('metro-config/src/defaults/defaults').assetExts;
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: [
      ...defaultAssetExts, // <- array spreading defaults
      //Video formats
      'mp4',
      //Image formats
      'gif',
      'jpg',
    ],
  },
};
