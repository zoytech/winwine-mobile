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
import {ScreenKeys} from '../../../../../navigations/ScreenKeys';

const {width: screenWidth} = Dimensions.get('screen');

export default function MiniCardItem(props) {
  const {
    data,
    style,
    onActionButtonPress = () => {},
    navigation,
    titleStyle = Typography.label.large,
    subTitleStyle = Typography.label.medium,
    buttonStyle = Typography.label.small,
  } = props;

  const {cardDeck: name, tag: tag, uri: uri, cardDeckId: deckId} = data || {};

  const handlePressedImageArea = () => {
    onActionButtonPress();
    navigation.navigate({
      name: ScreenKeys.GAME_WAIT,
      params: {
        deckId: deckId || '',
      },
    });
  };
  const handlePressButton = () => {
    onActionButtonPress();
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: deckId || '',
      },
    });
  };

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  return (
    <OutlinedCard style={[styles.container, style]}>
      <Pressable style={getContainerStyle} onPress={handlePressedImageArea}>
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
            onPress={handlePressButton}
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
