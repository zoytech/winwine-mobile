import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomStatusBar} from '../components';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaViewComponent,
  StyleSheet,
} from 'react-native';
import {CreateDeckScreen} from './createDeckScreen';
import {CreateCardBottomSheet} from './createCardScreen';
import {useCallback, useMemo, useRef} from 'react';

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

  return (
    <BottomSheetModalProvider>
      <SafeAreaViewComponent>
        <CustomStatusBar />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={styles.view}
        />
        <CreateDeckScreen onOpenModal={handlePresentModalPress} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          overDragResistanceFactor={0}
          onCloseModal={handleClosePress}>
          <CreateCardBottomSheet />
        </BottomSheetModal>
      </SafeAreaViewComponent>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({});
