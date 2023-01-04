import {WIDTH} from 'src/constants';

const gamePlayStyle = {
  container: {
    width: WIDTH?.SCREEN,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    width: '100%',
    flexDirection: 'column',
  },
  progressBar: {
    width: '100%',
    aspectRatio: 6,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    aspectRatio: 0.78,
    paddingTop: 32,
  },
  action: {
    width: '100%',
    aspectRatio: 3,
    paddingVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  largeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  smallIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  indicatorLine: {
    height: 32,
    backgroundColor: 'blue',
    width: 1,
    position: 'absolute',
  },
  emptyView: {
    width: '100%',
    aspectRatio: 7 / 16,
    paddingVertical: 100,
  },
  hashtags: {
    flexDirection: 'row',
  },
};

export default gamePlayStyle;
