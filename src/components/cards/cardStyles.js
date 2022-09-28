// const CardSizeVariant = {
//     game: 'game',
//     preview: 'preview',
//     end: 'end',
// };
//

const useCardStyle = {
  gameCard: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',

      width: 274,
      height: 450,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 0.5,

      //ratio: 1.64 width, height of card
    },
    headline: {
      flex: 3,
    },

    content: {
      flex: 5,
      justifyContent: 'center',
      paddingHorizontal: 47,
    },

    button: {
      flex: 1,

      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      alignItems: 'center',

      width: '100%',
      padding: 0,
    },
  },
  previewSmall: {},
  previewLarge: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',

      width: 266,
      height: 254,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 0.5,

      //ratio: 1.64 width, height of card
    },
    headline: {
      flex: 3,
    },

    content: {
      flex: 5,
      justifyContent: 'center',
      paddingHorizontal: 47,
    },

    button: {
      flex: 1,

      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      alignItems: 'center',

      width: '100%',
      padding: 0,
    },
  },
};

export default useCardStyle;
