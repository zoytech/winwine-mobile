// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
// import {Navigation} from 'react-native-navigation';
// import {
//   BasicDialog,
//   BlankScreen,
//   CardDialog,
//   GamePlayScreen,
//   GameWaitScreen,
//   HomeScreen,
// } from 'src/screens';
// import {ScreenKeys} from '../navigations/ScreenKeys';
//
// // register all screens of the app (including internal ones)
// export function registerScreens() {
//   Navigation.registerComponent(
//     ScreenKeys.HOME,
//     () => gestureHandlerRootHOC(HomeScreen),
//     () => HomeScreen,
//   );
//   Navigation.registerComponent(
//     ScreenKeys.WAIT_GAME,
//     () => gestureHandlerRootHOC(GameWaitScreen),
//     () => GameWaitScreen,
//   );
//   Navigation.registerComponent(
//     ScreenKeys.PLAY_GAME,
//     () => gestureHandlerRootHOC(GamePlayScreen),
//     () => GamePlayScreen,
//   );
//   Navigation.registerComponent(
//     ScreenKeys.CARD_DIALOG,
//     () => gestureHandlerRootHOC(CardDialog),
//     () => GamePlayScreen,
//   );
//   Navigation.registerComponent(
//     ScreenKeys.BASIC_DIALOG,
//     () => gestureHandlerRootHOC(BasicDialog),
//     () => GamePlayScreen,
//   );
//   Navigation.registerComponent(
//     ScreenKeys.BLANK,
//     () => gestureHandlerRootHOC(BlankScreen),
//     () => GamePlayScreen,
//   );
// }
