const ActionStyle = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
};

//TODO: why upper case these varaible. Check convention
const HeaderStyle = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    flexDirection: 'column',
  },
  monogram: {
    flex: 1,
    alignItems: 'flex-start',
  },
};

const HeadlineStyle = {
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heading: {
    backgroundColor: 'blue',
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
};

const Media = {
  container: {
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
    aspectRatio: 1,
  },
};
const SupportingTextStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};

export {ActionStyle, HeaderStyle, HeadlineStyle, Media, SupportingTextStyle};
