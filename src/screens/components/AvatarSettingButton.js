import {BaseAvatarButton} from 'src/components';
import {defaultOfUser} from 'src/constants';

export default function AvatarSettingButton(props) {
  const {navigation, route, userToken, style, ...otherProps} = props;
  const handleAvatarPressed = () => {
    console.log('handleAvatarPressed: ', userToken);
  };
  return (
    <BaseAvatarButton
      {...otherProps}
      avatar={defaultOfUser?.AVATAR}
      style={style}
      onPress={handleAvatarPressed}
    />
  );
}
