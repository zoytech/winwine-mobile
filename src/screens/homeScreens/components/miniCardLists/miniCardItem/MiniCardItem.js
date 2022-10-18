import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {FilledButton, OutlinedCard} from 'src/components';
import {Typography} from 'src/themes';
import {PressableImage} from './components';

const {width: screenWidth} = Dimensions.get('screen');

export default function MiniCardItem(props) {
  const {
    data,
    style,
    onActionButtonPress = () => {},
    titleStyle = Typography.label.large,
    subTitleStyle = Typography.label.medium,
    buttonStyle = Typography.label.small,
  } = props;

  const {cardDeck: name, tag: tag, uri: uri} = data || {};

  const handlePressedImageArea = () => {
    onActionButtonPress();
    alert('Move to game wait screen');
  };
  const handlePressButton = () => {
    onActionButtonPress();
    alert('Move to game play screen');
  };
  return (
    <OutlinedCard style={[styles.container, style]}>
      <PressableImage
        uri={uri}
        style={styles.pressedArea}
        onPress={handlePressedImageArea}
      />
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
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.35,
    aspectRatio: 0.67,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  pressedArea: {
    width: '100%',
    height: '60%',
  },
  headline: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  action: {
    flex: 1,
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
});
