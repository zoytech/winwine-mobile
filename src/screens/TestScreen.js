import {Image, ScrollView, StyleSheet} from 'react-native';
import happyBeer from 'src/assets/images/happy_beer.gif';

export default function TestScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
      <Image source={happyBeer} style={{width: 100, height: 100}} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});
