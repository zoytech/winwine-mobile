import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useCallback, useMemo, useRef, useState} from 'react';
import {CustomStatusBar} from '../components';
import {Color, ColorVariant} from '../../themes';
import {CreateDeckScreen} from './createDeckScreen';
import {CreateCardBottomSheet} from './createCardScreen';

export default function CreateProviderScreen({navigation, route}) {
  const [isScrolled, setIsScrolled] = useState(true);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['90%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current.present();
    setIsScrolled(false);
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <CreateDeckScreen
          onOpenModal={handlePresentModalPress}
          navigation={navigation}
          route={route}
          scrollEnabled={isScrolled}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          overDragResistanceFactor={0}
          enablePanDownToClose={false}
          onCloseModal={handleClosePress}>
          <CreateCardBottomSheet navigation={navigation} route={route} />
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
