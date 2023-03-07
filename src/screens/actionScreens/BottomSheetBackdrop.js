import {Pressable} from 'react-native';
import {View} from 'react-native';

export default function BottomSheetBackdrop(props) {
    const {children, onPress = () => {}} = props;
  return (
          <Pressable style={{backgroundColor: "red", width:'100%', height: '100%'}}
              onPress={onPress}/>
  );
}
