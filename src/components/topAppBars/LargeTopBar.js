import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {StandardIconButton} from 'src/components/iconButtons';

const buttonArr = [
  {
    name: 'paperclip',
    handlePress: () => alert('button 1'),
  },
  {
    name: 'sharealt',
    handlePress: () => alert('button 2'),
  },
  {
    name: 'ellipsis1',
    handlePress: () => alert('button 3'),
  },
];

export default function LargeTopBar(props) {
  const {
    content = 'Home Page',
    leadingIcon,
    // trailingIconArr = [],
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;

  const containerStyle = [styles.container, style];
  const defaultContentStyle = [contentStyle];

  function ImagePressable({avatar}) {
    const getPressStyle = ({pressed}) => {
      return pressed
        ? [styles.targetSize, styles.opacityPressed]
        : styles.targetSize;
    };
    return (
      <Pressable style={getPressStyle} onPress={() => alert('avatar')}>
        <Image source={avatar} style={styles.avatarIcon} />
      </Pressable>
    );
  }

  function renderIconButtonItem(name, handlePress) {
    return (
      <View style={styles.targetSize} key={name}>
        <StandardIconButton
          name={name}
          onPress={handlePress}
          style={styles.icon}
        />
      </View>
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={styles.targetSize}>
        <StandardIconButton
          name={'arrowleft'}
          onPress={() => alert('leading icon')}
          style={styles.icon}
        />
      </View>
      {content && <Text style={contentStyle}>{content}</Text>}
      <View style={styles.iconDisplay}>
        {buttonArr &&
          buttonArr.map(({name, handlePress}) =>
            renderIconButtonItem(name, handlePress),
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  icon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
  iconDisplay: {
    flexDirection: 'row',
  },
  avatarIcon: {
    borderRadius: 15,
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  opacityPressed: {
    opacity: 0.75,
  },
});
