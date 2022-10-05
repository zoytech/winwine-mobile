const cardItemLayout = {
  fullscreen: {
    container: {
      width: 320,
      height: 480,
      flexDirection: 'column',
      alignContent: 'center',
      borderRadius: 16,
      overflow: 'hidden',
    },
    header: {
      paddingHorizontal: 28,
      paddingVertical: 10,
      flex: 1,
    },
    media: {
      flex: 3,
      alignItems: 'center',
    },
    headline: {
      paddingHorizontal: 28,
      paddingVertical: 10,
      flex: 1,
    },
    supportingText: {
      paddingHorizontal: 28,
      paddingVertical: 10,
      flex: 1,
    },
    action: {
      paddingHorizontal: 28,
      paddingVertical: 10,
      flex: 1,
    },
  },
  packageItem: {
    container: {
      width: 128,
      height: 190,
      borderWidth: 0.5,
      borderRadius: 4,
    },
    action: {
      flex: 1,
      width: '100%',
    },
    media: {
      flex: 2,
      width: '100%',
    },
    headline: {
      flex: 1,
      width: '100%',
      paddingLeft: 10,
    },
  },
};

export default cardItemLayout;
