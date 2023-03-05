import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';
import {CustomStatusBar} from '../components';
import {Color, ColorVariant} from '../../themes';
import {CreateDeckScreen} from './createDeckScreen';
import {CreateCardBottomSheet} from './createCardScreen';

export default function CreateProviderScreen({navigation, route}) {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current.present();
  }, []);

  function handleClosePress() {
    bottomSheetModalRef.current.dismiss();
    // navigation.navigate({
    //   name: ScreenKeys.CREATE_DECK,
    //   params: {
    //     cardsParam: creatingCards || [],
    //   },
    //   merge: true,
    // });
  }

  const primaryColor = Color.light[ColorVariant.tertiary]?.base;

  return (
    <BottomSheetModalProvider>
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.view}
      />
      <CreateDeckScreen
        onOpenModal={handlePresentModalPress}
        navigation={navigation}
        route={route}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        overDragResistanceFactor={0}
        onCloseModal={handleClosePress}>
        <CreateCardBottomSheet navigation={navigation} route={route} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({});

// <SafeAreaViewComponent>
//   <CustomStatusBar />
//   <KeyboardAvoidingView
//     behavior={Platform.OS === 'ios' ? 'padding' : ''}
//     style={styles.view}
//   />
//   <CreateDeckScreen onOpenModal={handlePresentModalPress} />
//   <BottomSheetModal
//     ref={bottomSheetModalRef}
//     snapPoints={snapPoints}
//     onChange={handleSheetChanges}
//     overDragResistanceFactor={0}
//     onCloseModal={handleClosePress} >
//     <CreateCardBottomSheet />
//   </BottomSheetModal>
// </SafeAreaViewComponent>
