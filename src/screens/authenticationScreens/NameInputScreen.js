import React from 'react';
import {StyleSheet} from 'react-native';
import {BasicDialogContent} from 'src/components';

const actions = {
  SUBMIT: 'Lưu',
  CANCEL: 'Quay lại',
};
const headline = {
  ENTER_NAME: '',
};
export default function NameInputScreen({navigation, route}) {
  function handleSubmitUserNamePress() {
    alert('Submitted success');
  }

  function handleCancelPress() {
    alert('Cancel');
  }

  return (
    <BasicDialogContent
      headline={headline?.ENTER_NAME}
      supportingText={'Leave and return to the home screen.'}
      mainAction={actions?.SUBMIT}
      subAction={actions?.CANCEL}
      onMainActionPress={handleSubmitUserNamePress}
      onSubActionPress={handleCancelPress}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
  },
});
