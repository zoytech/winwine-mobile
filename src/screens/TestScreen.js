import {Image, View} from 'react-native';
import happyBeer from 'src/assets/images/happy_beer.gif';

export default function TestScreen() {
  return (
    <View
      style={{
        backgroundColor: 'coral',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Image source={happyBeer} style={{width: 100, height: 100}} />
    </View>
  );
}
