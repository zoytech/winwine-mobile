import {Image} from 'react-native';
import happyBeer from 'src/assets/images/happy_beer.gif';

export default function TestScreen() {
  return <Image source={happyBeer} style={{width: 100, height: 100}} />;
}
