import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilledButton, OutlinedCard} from 'src/components';
import {Typography} from 'src/themes';

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
            <Text style={titleStyle} numberOfLines={1} ellipsizeMode={'tail'}>
              {name}
            </Text>
          )}
          {tag && <Text style={subTitleStyle}>{tag}</Text>}
        </View>
        <View style={styles.action}>
          <FilledButton
            content={'play now'}
            contentStyle={buttonStyle}
            style={styles.button}
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
  opacityPressed: {
    opacity: 0.75,
    backgroundColor: 'white',
  },
});
