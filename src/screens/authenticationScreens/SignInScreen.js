import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';
import {FilledButton} from 'src/components';
import {authentication, widthOf} from 'src/constants';
import {FaceBookButton} from './components';

export default function SignInScreen() {
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const {Size, Color} = GoogleSigninButton;

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: authentication?.WEB_CLIENT_ID,
      offlineAccess: true,
    });
    isSignedInCheck();
  }, []);

  async function isSignedInCheck() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  }

  async function getCurrentUserInfo() {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  }

  async function handleGoogleSigninPressed() {
    try {
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      console.log('userInfo: ', userData);
      setUserInfo(userData);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      const {SIGN_IN_CANCELLED, IN_PROGRESS, PLAY_SERVICES_NOT_AVAILABLE} =
        statusCodes;
      if (error.code === SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === IN_PROGRESS) {
        alert('Signin progress');
      } else if (error.code === PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert(error.message);
      }
    }
  }

  async function handleGoogleSignoutPressed() {
    setGettingLoginStatus(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo([]);
    } catch (error) {
      console.log('error from signout: ', error);
    }
    setGettingLoginStatus(false);
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
        {gettingLoginStatus && (
          <FilledButton
            onPress={handleGoogleSignoutPressed}
            content={'Logout'}
            style={styles.button}
          />
        )}
      </>
    );
  }

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior={'automatic'}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {renderGoogleSigninButton()}
            </View>
            <View style={styles.buttonContainer}>
              {!gettingLoginStatus && <Text>You are currently logged out</Text>}
              {renderSignoutButton()}
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <FaceBookButton />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
