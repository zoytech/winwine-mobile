import {Image, Pressable, StyleSheet} from 'react-native';

export default function BaseAvatarButton(props) {
  const {avatar, style, contentStyle, avatarStyle, onPress, ...otherProps} =
    props;
  const getPressStyle = ({pressed}) => {
    return [styles.container, pressed && styles.opacityPressed, style];
  };
  return (
    <Pressable {...otherProps} style={getPressStyle} onPress={onPress}>
      <Image source={avatar} style={styles.avatarIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  avatarIcon: {
    borderRadius: 15,
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  opacityPressed: {
    opacity: 0.5,
  },
});
