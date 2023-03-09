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
import {CustomStatusBar} from '../components';
import {CreateDeckScreen} from './createDeckScreen';
import {CreateCardBottomSheet} from './createCardScreen';

export default function CreateProviderScreen({navigation, route}) {
  const [currentCardData, setCurrentCardData] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['90%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {}, []);

  function handleReceiveCardContents(cardContents) {
    if (cardContents.length > 0) {
      setCurrentCardData(cardContents);
    }
  }

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
          createdCards={currentCardData}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={false}
          handleIndicatorStyle={{backgroundColor: 'transparent'}}
          overDragResistanceFactor={0}>
          <CreateCardBottomSheet
            navigation={navigation}
            route={route}
            onReceiveCardContents={handleReceiveCardContents}
            createdCards={currentCardData}
          />
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
