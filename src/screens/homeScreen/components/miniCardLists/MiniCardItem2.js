import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilledButton, OutlinedCard} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';
import {TagName} from '../../../components';
import member1 from 'src/assets/images/preview-package/member1.jpg';

const {width: screenWidth} = Dimensions.get('screen');

const DefaultName = {
  cardDeckName: 'Bộ bài số 15',
  cardDeckDescription: `Dưới đây là mô tả của ${DefaultName?.cardDeckName}`,
  cardDeckTag: '',
  cardDeckImage: member1,
};

export default function MiniCardItem2(props) {
  const {
    data,
    style,
    onImageAreaPress = () => {},
    onButtonPress = () => {},
  } = props;

  const {
    cardDeckName: cardDeckName,
    cardDeckImage: cardDeckImage,
    cardDeckTag: cardDeckTag,
  } = data || {};
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  function getContainerStyle({pressed}) {
    return pressed && styles.opacityPressed;
  }

  return (
    <OutlinedCard style={[styles.container, style]}>
      <Pressable style={getContainerStyle} onPress={onImageAreaPress}>
        <View style={styles.media}>
          <Image
            source={
              cardDeckImage
                ? {
                    uri: cardDeckImage,
                  }
                : DefaultName?.cardDeckImage
            }
            style={styles.image}
          />
        </View>
        <View style={styles.headline}>
          <Text
            style={[Typography.label.large, {color: textColor}]}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {cardDeckName ? cardDeckName : DefaultName?.cardDeckName}
          </Text>
          <TagName
            content={cardDeckTag ? cardDeckTag : DefaultName?.cardDeckTag}
          />
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
