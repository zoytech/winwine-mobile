import React from 'react';
import {View} from 'react-native';
import {
  AccessToken,
  LoginButton,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';

export default function FaceBookButton() {
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ' +
            result.grantedPermissions.toString(),
        );
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
  const currentProfile = Profile.getCurrentProfile().then(function (
    currentProfile,
  ) {
    if (currentProfile) {
      console.log(
        'The current logged user is: ' +
          currentProfile.name +
          '. His profile id is: ' +
          currentProfile.userID,
      );
    }
  });
  console.log(currentProfile);
  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  );
}
