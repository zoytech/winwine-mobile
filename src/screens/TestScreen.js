import {Image} from 'react-native';

export default function TestScreen() {
  return (
    <Image
      source={require('src/assets/images/happy_beer.gif')}
      style={{
        width: 100,
        height: 100,
        flexDirection: 'row',
        alignSelf: 'center',
      }}
    />
  );
}
