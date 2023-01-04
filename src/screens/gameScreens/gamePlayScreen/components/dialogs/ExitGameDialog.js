import {BasicDialogContent} from 'src/components';

export default function ExitGameDialog({onMainActionPress, onSubActionPress}) {
  return (
    <BasicDialogContent
      headline={'Thoát Game?'}
      supportingText={'Thoát khỏi game và trở lại Home'}
      mainAction={'THOÁT GAME'}
      subAction={'TRỞ VỀ'}
      onMainActionPress={onMainActionPress}
      onSubActionPress={onSubActionPress}
    />
  );
}
