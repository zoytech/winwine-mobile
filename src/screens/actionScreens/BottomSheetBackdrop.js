import {Pressable} from 'react-native';

export default function BottomSheetBackdrop(props) {
  const {children, onCloseModal = () => {}} = props;
  return (
    <BottomSheetBackdrop opacity={0.5}>
      <Pressable onPress={onCloseModal} />
    </BottomSheetBackdrop>
  );
}
