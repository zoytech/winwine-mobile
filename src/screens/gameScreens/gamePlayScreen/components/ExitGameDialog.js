import {BasicDialogContent} from 'src/components';

export default function ExitGameDialog({onMainActionPress, onSubActionPress}) {
  return (
    <BasicDialogContent
      headline={'Exit this game ?'}
      supportingText={'Leave and return to the home screen.'}
      mainAction={'EXIT'}
      subAction={'RESUME'}
      onMainActionPress={onMainActionPress}
      onSubActionPress={onSubActionPress}
    />
  );
}
