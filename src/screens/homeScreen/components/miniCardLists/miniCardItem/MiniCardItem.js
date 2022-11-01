import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilledIconButton, OutlinedCard} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

const {width: screenWidth} = Dimensions.get('screen');

export default function MiniCardItem(props) {
  const {
    data,
    style,
    onImageAreaPress = () => {},
    onButtonPress = () => {},
    titleStyle = Typography.label.large,
    subTitleStyle = Typography.label.medium,
    buttonStyle = Typography.label.small,
  } = props;

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
              style={[titleStyle, {color: textColor}]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {name}
            </Text>
          )}
          {tag && (
            <Text style={[subTitleStyle, {color: textColor}]}>{tag}</Text>
          )}
        </View>
        <View style={styles.action}>
          <FilledIconButton
            name={'play'}
            contentStyle={buttonStyle}
            style={styles.iconButton}
            onPress={onButtonPress}
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
  iconButton: {
    // width: '50%',
    // aspectRatio: 3,
    minWidth: '70%',
    minHeight: 3,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  opacityPressed: {
    opacity: 0.75,
    // backgroundColor: 'white',
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
