import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {FilledButton} from 'src/components';
import {authentication} from 'src/constants';

export default function GoogleButton() {
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);
  const gettingLoginStatus_test = false;
  const [userInfo, setUserInfo] = useState(null);
  const {Size, Color} = GoogleSigninButton;
  const {
    SIGN_IN_CANCELLED,
    IN_PROGRESS,
    PLAY_SERVICES_NOT_AVAILABLE,
    SIGN_IN_REQUIRED,
  } = statusCodes;

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['email'],
  //     webClientId: authentication?.WEB_CLIENT_ID,
  //     offlineAccess: true,
  //   });
  //   isSignedInCheck();
  // }, []);

  async function isSignedInCheck() {
    const isSignedIn = await GoogleSignin.isSigned();
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
      if (error.code === SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
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

  function handleSigninPressTest() {
    GoogleSignin.configure({
      androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
      iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(JSON.stringify(userInfo));
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  }

  async function handleGoogleSignoutPressed() {
    setGettingLoginStatus(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.log('error from signout: ', error);
    }
    setGettingLoginStatus(false);
  }

  function renderSignoutButton() {
    return (
      <>
        {gettingLoginStatus_test && (
          <FilledButton
            onPress={handleGoogleSignoutPressed}
            content={'Logout'}
            style={styles.button}
          />
        )}
      </>
    );
  }

  function renderSignoutButton_test() {
    return <View style={{width: 100, height: 100, backgroundColor: 'coral'}} />;
  }

  const iconButtonProps = {
    size: Size.Wide,
    color: Color.Dark,
    onPress: () => handleGoogleSigninPressed(),
    style: styles.container,
  };

  if (gettingLoginStatus_test) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <>
        <GoogleSigninButton {...iconButtonProps} />
        <View style={styles.logout}>
          {!gettingLoginStatus_test && (
            <Text>You are currently logged out</Text>
          )}
          {renderSignoutButton()}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: 'gold',
  },
  container: {
    width: 192,
    height: 48,
  },
});

/*
const {
    signIn,
    hasPlayServices,
    configure,
    addScopes,
    signInSilently,
    signOut,
    revokeAccess,
    isSignedIn,
    getCurrentUser,
  } = GoogleSignin;

 */
