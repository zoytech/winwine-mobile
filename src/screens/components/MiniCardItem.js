import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {OutlinedCard, StandardIconButton} from 'src/components';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {DECK, WIDTH} from 'src/constants';

export default function MiniCardItem(props) {
  const {
    data,
    pinned,
    liked,
    style,
    contentStyle,
    onPreviewPress = () => {},
    onPlayPress = () => {},
    onLongPress = () => {},
  } = props;

  const {cardDeckName, cardDeckImage, hashtags} = data || {};
  const deckName = cardDeckName ? cardDeckName : DECK?.NAME;
  const deckFirstTag = hashtags ? hashtags[0] : DECK?.TAG;
  const deckImage = cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE;

  const titleColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const subTittleColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_068;
  const iconColor = Color.light[ColorVariant.primary]?.base;
  const borderColor = Color.light[ColorVariant.outline]?.base;
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
          {deckName}
        </Text>
        <Text style={subTitleStyle}>{deckFirstTag} ...</Text>
        {renderIcons()}
      </>
    );
  }

  function renderIcons() {
    const iconProps = {
      size: 14,
      color: iconColor,
      style: {paddingHorizontal: 2},
    };
    return (
      <View style={styles.iconDisplay}>
        {pinned && <Icon {...iconProps} name={'pushpin'} />}
        {liked && <Icon {...iconProps} name={'star'} />}
      </View>
    );
  }

  function renderActionComponents() {
    return (
      <>
        <StandardIconButton
          style={[
            styles.pressArea,
            {borderRightWidth: StyleSheet.hairlineWidth},
          ]}
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
        <View style={[styles.action, {borderTopColor: borderColor}]}>
          {renderActionComponents()}
        </View>
      </Pressable>
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH?.SCREEN * 0.4,
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
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  iconDisplay: {
    flexDirection: 'row',
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
});
