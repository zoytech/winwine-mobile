import React from 'react';
import {
  AccessToken,
  LoginButton,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';

export default function FaceBookButton() {
  const loginWithPermissions = LoginManager.logInWithPermissions;
  const getCurrentProfile = Profile.getCurrentProfile;
  const getCurrentAccessToken = AccessToken.getCurrentAccessToken;

  loginWithPermissions(['public_profile']).then(
    result => {
      const {isCancelled, grantedPermissions} = result;
      if (isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ',
          grantedPermissions.toString(),
        );
      }
    },
    error => {
      console.log('Login fail with error: ' + error);
    },
  );
  const currentProfile = getCurrentProfile().then(profile => {
    if (profile) {
      console.log(
        `The current logged user is: ${profile.name}. His profile id is: ${profile.userID}`,
      );
    }
  });
  console.log(currentProfile);

  function handleLoginFinished(error, result) {
    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      getCurrentAccessToken().then(data => {
        console.log(data.accessToken.toString());
      });
    }
  }

  return (
    <LoginButton
      onLoginFinished={handleLoginFinished}
      onLogoutFinished={() => console.log('logout.')}
    />
  );
}
