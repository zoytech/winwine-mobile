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
import {defaultOfDeck, widthOf} from 'src/constants';

const IconByTagName = {
  '18+': 'tag',
};

export default function MiniCardItem(props) {
  const {
    data,
    pinned,
    liked,
    style,
    contentStyle,
    onPreviewPress = () => {},
    onPlayPress = () => {},
    ...otherProps
  } = props;
  const {cardDeck, tag, uri} = data || {};
  const deckTitle = cardDeck ? cardDeck : defaultOfDeck?.TITLE;
  const deckTag = tag ? tag : defaultOfDeck?.TAG;
  const deckImage = uri ? {uri: uri} : defaultOfDeck?.IMAGE;

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
        {deckTitle && (
          <Text style={titleStyle} numberOfLines={1} ellipsizeMode={'tail'}>
            {deckTitle}
          </Text>
        )}
        <View style={styles.subTitle}>
          <Text style={subTitleStyle}>{deckTag}</Text>
          {renderIcons()}
        </View>
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
    const borderStyle = {
      borderRightWidth: 0.5,
      borderRightColor: borderColor,
    };
    return (
      <>
        <StandardIconButton
          style={[styles.pressArea, borderStyle]}
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
        {...otherProps}
        style={getContainerStyle}
        onPress={onPlayPress}>
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
  iconDisplay: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'gold',
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
