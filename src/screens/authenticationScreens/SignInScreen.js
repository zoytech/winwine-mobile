import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {useEffect, useState} from 'react';
import {FilledButton} from '../../components';

export default function SignInScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const {Size, Color} = GoogleSigninButton;

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  async function handleGoogleSigninPressed() {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setLoggedIn(true);
    } catch (error) {
      const {SIGN_IN_CANCELLED, IN_PROGRESS, PLAY_SERVICES_NOT_AVAILABLE} =
        statusCodes;
      if (error.code === SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === IN_PROGRESS) {
        alert('Signin progress');
      } else if (error.code === PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert('some other errors');
      }
    }
  }

  async function handleGoogleSignoutPressed() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signout();
      setLoggedIn(false);
      setUserInfo([]);
    } catch (error) {
      console.log('error from signout: ', error);
    }
  }

  function renderGoogleSigninButton() {
    const iconButtonProps = {
      size: Size.Wide,
      color: Color.Dark,
      onPress: handleGoogleSigninPressed,
      style: styles.button,
    };
    return <GoogleSigninButton {...iconButtonProps} />;
  }

  function renderSignoutButton() {
    return (
      <>
        {loggedIn && (
          <FilledButton
            onPress={handleGoogleSignoutPressed}
            content={'Logout'}
            style={styles.button}
          />
        )}
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {renderGoogleSigninButton()}
            </View>
            <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {renderSignoutButton()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 192,
    height: 48,
  },
});
