import {useCallback, useMemo, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Color, ColorVariant} from 'src/themes';
import {CustomStatusBar} from '../components';
import {CreateDeckScreen} from './createDeckScreen';
import {CreateCardBottomSheet} from './createCardScreen';

export default function CreateProviderScreen({navigation, route}) {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['90%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current.close();
  }, []);
  const renderBackdrop = useCallback(
    props => renderBackdropComponent(props),
    [],
  );

  function renderBackdropComponent(props) {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }

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
          onCloseModal={handleCloseModalPress}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          overDragResistanceFactor={0}>
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
