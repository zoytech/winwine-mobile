import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilledButton, OutlinedCard, TonalButton} from 'src/components';
import {Typography} from 'src/themes';

const {width: screenWidth} = Dimensions.get('screen');

export default function MiniCardItem(props) {
  const {
    data,
    style,
    onPress = () => {},
    onActionButtonPress = () => {},
    titleStyle = Typography.label.large,
    subTitleStyle = Typography.label.medium,
    buttonStyle = Typography.label.small,
  } = props;

  const {package: name, tag: tag, uri: uri} = data || {};

  const handlePressedImageArea = () => {
    onActionButtonPress();
    alert('Move to game wait screen');
  };
  const handlePressButton = () => {
    onActionButtonPress();
    alert('Move to game play screen');
  };
  return (
    <OutlinedCard style={[styles.container, style]} onPress={onPress}>
      <Pressable onPress={handlePressedImageArea} style={styles.pressedArea}>
        <Image source={{uri: uri}} style={styles.media} />
      </Pressable>

      <View style={styles.headline}>
        {name && <Text style={titleStyle}>{name}</Text>}
        {tag && <Text style={subTitleStyle}>{tag}</Text>}
      </View>
      <View style={styles.action}>
        <FilledButton
          content={'play now'}
          contentStyle={buttonStyle}
          style={styles.button}
          onPress={handlePressButton}
          // disabled={true}
        />
      </View>
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.35,
    aspectRatio: 0.67,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  pressedArea: {
    width: '100%',
    height: '60%',
  },
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'blue',
  },
  headline: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '70%',
    aspectRatio: 3,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
