const gameCard = {
  size: {
    medium: {
      width: 249,
      height: 334,
    },
    large: {
      width: 249,
      height: 408,
    },
  },
  base: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 47,
    borderRadius: 16,
  },
};

const previewSmall = {};
const previewLarge = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',

    width: 266,
    height: 254,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0.5,
    content: {
      flex: 5,
      justifyContent: 'center',
      paddingHorizontal: 47,
    },
  },
};

export {gameCard, previewSmall, previewLarge};
