import {StyleSheet, Text, View} from 'react-native';
import {FilledCard, StandardIconButton} from 'src/components';
import {Typography} from 'src/themes';

export default function NavigatedGameCard(props) {
  const {
    content,
    style,
    bodyTypo = Typography.body.large,
    onBackwardPressed = () => {},
    onForwardPressed = () => {},
    onBackwardDisabled = () => {},
    onForwardDisabled = () => {},
    ...otherProps
  } = props;

  return (
    <View {...otherProps} style={[styles.cardWithButton, style]}>
      <StandardIconButton
        name="caretleft"
        onPress={onBackwardPressed}
        disabled={onBackwardDisabled}
      />
      <FilledCard style={[styles.gameCard]}>
        {content && <Text style={[bodyTypo, styles.text]}>{content}</Text>}
      </FilledCard>
      <StandardIconButton
        name="caretright"
        onPress={onForwardPressed}
        disabled={onForwardDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gameCard: {
    width: '70%',
    aspectRatio: 7 / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
