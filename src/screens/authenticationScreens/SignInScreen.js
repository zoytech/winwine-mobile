import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {widthOf} from 'src/constants';
import {FaceBookButton, GoogleButton} from './components';

export default function SignInScreen({navigation, route}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior={'automatic'}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <GoogleButton />
          </View>
          <View style={styles.sectionContainer}>
            <FaceBookButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthOf?.SCREEN,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: 'coral',
    height: 200,
  },
  buttonContainer: {
    backgroundColor: 'gold',
  },
  button: {
    width: 192,
    height: 48,
  },
});
