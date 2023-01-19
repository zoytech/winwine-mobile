import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  OutlinedCard,
  SkeletonLoading,
  StandardIconButton,
} from 'src/components';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {DECK, WIDTH} from 'src/constants';

const itemWidth = WIDTH?.SCREEN * 0.4;
const itemHeight = itemWidth / 0.67;

export default function MiniCardItem(props) {
  const {
    data,
    liked,
    isLoading = false,
    style,
    contentStyle,
    onPreviewPress = () => {},
    onPlayPress = () => {},
    onLongPress = () => {},
  } = props;
  const {cardDeckId, cardDeckName, cardDeckImage, hashtags} = data || {};
  const deckName = cardDeckName ? cardDeckName : DECK?.NAME;
  const decktags = hashtags ? hashtags : DECK?.HASHTAGS;
  const deckImage = cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE;

  const titleColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const subTittleColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_068;
  const iconColor = Color.light[ColorVariant.primary]?.base;
  const borderColor = Color.light[ColorVariant.outline]?.base;

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  function renderMainContent() {
    const titleStyle = [
      Typography.label.large,
      {color: titleColor},
      contentStyle,
    ];
    const subTitleStyle = [
      Typography.label.small,
      {color: subTittleColor},
      styles.subTitle,
      contentStyle,
    ];
    const textProps = {
      numberOfLines: 1,
      ellipsizeMode: 'tail',
    };
    return (
      <>
        <Text {...textProps} style={titleStyle}>
          {deckName}
        </Text>
        <View style={styles.tagsAndIcons}>
          {decktags.map(item => (
            <Text key={item} style={subTitleStyle}>
              {item}
            </Text>
          ))}
        </View>
      </>
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
      {isLoading ? (
        <SkeletonLoading
          enabled={isLoading}
          width={itemWidth}
          height={itemHeight}
        />
      ) : (
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
      )}
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemHeight,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'space-between',
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
  tagsAndIcons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pressArea: {
    width: '50%',
    height: '100%',
    borderRadius: 0,
  },
  icon: {
    size: 24,
  },
  subTitle: {
    paddingHorizontal: 1,
  },
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});
