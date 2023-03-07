import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useCallback, useMemo, useRef, useState} from 'react';
import {CustomStatusBar} from '../components';
import {Color, ColorVariant} from '../../themes';
import {CreateDeckScreen} from './createDeckScreen';
import {CreateCardBottomSheet} from './createCardScreen';
import BottomSheetBackdrop from './BottomSheetBackdrop';

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

  const handleCloseModalPress = useCallback(() => {
    setIsScrolled(true);
  }, []);
  const renderBackdrop = useCallback(
    props => renderBackdropComponent(props),
    [],
  );

  function renderBackdropComponent(props) {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        style={{backgroundColor: 'coral'}}
        pressBehavior={'close'}
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
          scrollEnabled={isScrolled}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
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
  opacityPressed: {
    // opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
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
