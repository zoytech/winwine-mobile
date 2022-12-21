import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {OutlinedCard, StandardIconButton} from 'src/components';
import {Color, ColorVariant, StateLayersVariant, Typography} from 'src/themes';
import {defaultOfDeck, widthOf} from 'src/constants';
import {StateLayers} from '../../../../themes';

const IconByTagName = {
  '18+': 'tag',
};

export default function MiniCardItem(props) {
  const {
    data,
    pinned,
    style,
    contentStyle,
    onPreviewPress = () => {},
    onPlayPress = () => {},
    onLongPress = () => {},
  } = props;
  const {cardDeck, tag, uri} = data || {};
  const deckTitle = cardDeck ? cardDeck : defaultOfDeck?.TITLE;
  const deckTag = tag ? tag : defaultOfDeck?.TAG;
  const deckImage = uri ? {uri: uri} : defaultOfDeck?.IMAGE;

  const titleColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const subTittleColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_068;
  const iconColor = Color.light[ColorVariant.primary]?.base;
  const defaultContentStyle = [Typography.label.large, contentStyle];

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  function renderMainContent() {
    const titleStyle = [defaultContentStyle, {color: titleColor}];
    const subTitleStyle = [defaultContentStyle, {color: subTittleColor}];
    const iconProps = {
      name: 'pushpin',
      size: 14,
      color: iconColor,
    };
    return (
      <>
        {deckTitle && (
          <Text style={titleStyle} numberOfLines={1} ellipsizeMode={'tail'}>
            {deckTitle}
          </Text>
        )}
        <View style={styles.subTitle}>
          <Text style={subTitleStyle}>{deckTag}</Text>
          {pinned && <Icon {...iconProps} />}
        </View>
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
      <Pressable
        style={getContainerStyle}
        onPress={onPlayPress}
        onLongPress={onLongPress}>
        <View style={styles.media}>
          <Image source={deckImage} style={styles.image} />
        </View>
        <View style={styles.headline}>{renderMainContent()}</View>
      </Pressable>
      <View style={styles.action}>{renderActionComponents()}</View>
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
  subTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
