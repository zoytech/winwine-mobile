import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {OutlinedCard, StandardIconButton} from 'src/components';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {defaultOfDeck, widthOf} from 'src/constants';

const IconByTagName = {
  '18+': 'tag',
};

export default function MiniCardItem(props) {
  const {
    data,
    style,
    contentStyle,
    onPreviewPress = () => {},
    onPlayPress = () => {},
  } = props;
  const {cardDeck, tag, uri} = data || {};
  const deckTitle = cardDeck ? cardDeck : defaultOfDeck?.TITLE;
  const deckTag = tag ? tag : defaultOfDeck?.TAG;
  const deckImage = uri ? {uri: uri} : defaultOfDeck?.IMAGE;
  const borderColor = Color.light[ColorVariant.outline]?.base;
  const titleColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const subTittleColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_068;
  const defaultContentStyle = [Typography.label.large, contentStyle];

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  function renderMainContent() {
    const titleStyle = [defaultContentStyle, {color: titleColor}];
    const subTitleStyle = [defaultContentStyle, {color: subTittleColor}];
    return (
      <>
        <Text style={titleStyle} numberOfLines={1} ellipsizeMode={'tail'}>
          {deckTitle}
        </Text>
        <Text style={subTitleStyle}>{deckTag}</Text>
      </>
    );
  }

  function renderActionComponents() {
    return (
      <>
        <StandardIconButton
          style={[styles.pressArea, {borderRightWidth: 0.5}]}
          name={'eyeo'}
          onPress={onPreviewPress}
        />
        <StandardIconButton
          style={styles.pressArea}
          name={'play'}
          onPress={onPlayPress}
        />
      </>
    );
  }

  return (
    <OutlinedCard style={[styles.container, style]}>
      <Pressable style={getContainerStyle} onPress={onPlayPress}>
        <View style={styles.media}>
          <Image source={deckImage} style={styles.image} />
        </View>
        <View style={styles.headline}>{renderMainContent()}</View>
      </Pressable>
      <View style={[styles.action, {borderTopColor: borderColor}]}>
        {renderActionComponents()}
      </View>
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthOf?.SCREEN * 0.37,
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
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },
  pressArea: {
    width: '50%',
    height: '100%',
    borderRadius: 0,
  },
  icon: {
    size: 24,
  },
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
  title: {
    fontWeight: 'bold',
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
