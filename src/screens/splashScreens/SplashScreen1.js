import {StyleSheet, Text, View} from 'react-native';
import {APP_NAME, ScreenKeys} from 'src/constants';
import {FadeInView} from './components';
import {useState, useEffect} from 'react';

export default function SplashScreen({navigation}) {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setTimePassed(true);
    }, 10000);
  }, []);

  const handleHomeScreenRender = () => {
    navigation.navigate(ScreenKeys.HOME);
  };

  if (!timePassed) {
    return (
      <View style={styles.container}>
        <FadeInView style={styles.effect}>
          <Text style={styles.content}>{APP_NAME}</Text>
        </FadeInView>
      </View>
    );
  }
  handleHomeScreenRender();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effect: {
    width: 250,
    height: 50,
    backgroundColor: 'powderblue',
  },
  content: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
