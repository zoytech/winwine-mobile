import {WIDTH} from 'src/constants';

const gameWaitStyle = {
  container: {
    width: WIDTH?.SCREEN,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    aspectRatio: 0.8,
    paddingVertical: 16,
  },
  suggestingDeck: {
    width: '100%',
    aspectRatio: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 3,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
  },
  buttonContent: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  headerButtonIcon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
  emptyView: {
    width: '100%',
    aspectRatio: 1.5,
    paddingVertical: 30,
    justifyContent: 'center',
  },
};
export default gameWaitStyle;
