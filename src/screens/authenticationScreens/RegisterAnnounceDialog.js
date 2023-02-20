import {BasicDialogContent} from 'src/components';

export default function RegisterAnnounceDialog(props) {
  const {
    onNavigateAuthStackPress = () => {},
    onGoBackPress = () => {},
    ...otherProps
  } = props;

  function handleNavigateAuthStackPress() {
    onNavigateAuthStackPress();
  }

  function handleGoBackPress() {
    onGoBackPress();
  }

  return (
    <BasicDialogContent
      {...otherProps}
      headline={'Lưu ý'}
      supportingText={
        'Bạn cần tạo tài khoản để sử dụng chức năng này. ' + 'Tạo ngay!'
      }
      mainAction={'ĐĂNG KÍ'}
      subAction={'TRỞ VỀ'}
      onMainActionPress={handleNavigateAuthStackPress}
      onSubActionPress={handleGoBackPress}
    />
  );
}
