import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {widthOf} from 'src/constants';
import {FaceBookButton, GoogleButton} from './components';

export default function SignInScreen() {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior={'automatic'}
        style={styles.container}
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
    aspectRatio: 3 / 16,
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
