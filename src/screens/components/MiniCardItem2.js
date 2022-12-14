import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {OutlinedCard, StandardIconButton} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';
import {defaultOfDeck, widthOf} from 'src/constants';

export default function MiniCardItem2(props) {
  const {
    data,
    style,
    onImageAreaPress = () => {},
    onButtonPress = () => {},
  } = props;

  const {cardDeckName, cardDeckImage, cardDeckTag} = data || {};
  const deckName = cardDeckName ? cardDeckName : defaultOfDeck?.TITLE;
  const deckTag = cardDeckTag ? cardDeckTag : defaultOfDeck?.TAG;
  const deckImage = cardDeckImage ? {uri: cardDeckImage} : defaultOfDeck?.IMAGE;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  function renderMainContent() {
    return (
      <>
        <Text
          style={[Typography.label.large, {color: textColor}]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {deckName}
        </Text>
        <Text>{deckTag}</Text>
      </>
    );
  }

  function renderActionComponents() {
    return (
      <>
        <StandardIconButton
          style={[styles.pressArea, {borderRightWidth: 0.5}]}
          name={'eyeo'}
          onPress={onButtonPress}
        />
        <StandardIconButton
          style={styles.pressArea}
          name={'play'}
          onPress={onImageAreaPress}
        />
      </>
    );
  }

  return (
    <OutlinedCard style={[styles.container, style]}>
      <Pressable style={getContainerStyle} onPress={onImageAreaPress}>
        <View style={styles.media}>
          <Image source={deckImage} style={styles.image} />
        </View>
        <View style={styles.headline}>{renderMainContent()}</View>
        <View style={styles.action}>{renderActionComponents()}</View>
      </Pressable>
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthOf?.SCREEN * 0.35,
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
