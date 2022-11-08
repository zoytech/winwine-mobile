import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/AntDesign';
import {FilledButton, OutlinedCard} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

const {width: screenWidth} = Dimensions.get('screen');

const IconByTagName = {
  '18+': 'arrowleft',
};

export default function MiniCardItem(props) {
  const {
    data,
    style,
    tagName,
    onImageAreaPress = () => {},
    onButtonPress = () => {},
  } = props;

  const iconName = IconByTagName[tagName];
  const {cardDeck: name, tag: tag, uri: uri} = data || {};
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  return (
    <OutlinedCard style={[styles.container, style]}>
      <Pressable style={getContainerStyle} onPress={onImageAreaPress}>
        <View style={styles.media}>
          <Image source={{uri: uri}} style={styles.image} />
        </View>
        <View style={styles.headline}>
          {name && (
            <Text
              style={[Typography.label.large, {color: textColor}]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {name}
            </Text>
          )}
          {tag && (
            <Text style={[Typography.label.medium, {color: textColor}]}>
              {tag}
            </Text>
          )}
        </View>
        <View style={styles.action}>
          <FilledButton
            content={'Xem trước'}
            contentStyle={Typography.label.large}
            style={styles.button}
            onPress={onButtonPress}
            hitSlop={30}
            // disabled={true}
          />
        </View>
      </Pressable>
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.35,
    aspectRatio: 0.67,
    overflow: 'hidden',
    marginBottom: 16,
  },
  media: {
    width: '100%',
    aspectRatio: 1.2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  headline: {
    width: '100%',
    aspectRatio: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  action: {
    width: '100%',
    aspectRatio: 3,
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
  iconContainer: {
    minWidth: '50%',
    minHeight: 30,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 16,
  },
  icon: {
    size: 16,
  },
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});

/*
<FilledButton
            content={'play now'}
            contentStyle={buttonStyle}
            style={styles.button}
            onPress={onButtonPress}
            // disabled={true}
          />
 */
