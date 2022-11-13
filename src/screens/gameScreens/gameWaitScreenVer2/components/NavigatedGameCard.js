import {StyleSheet, Text, View} from 'react-native';
import {FilledCard, FilledIconButton} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function NavigatedGameCard(props) {
  const {
    content,
    style,
    contentStyle,
    onBackwardPressed = () => {},
    onForwardPressed = () => {},
    onBackwardDisabled = () => {},
    onForwardDisabled = () => {},
    ...otherProps
  } = props;

  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const textStyles = [
    contentStyle,
    Typography.body.large,
    {color: textColor},
    styles.text,
  ];

  return (
    <View {...otherProps} style={[styles.cardWithButton, style]}>
      <FilledIconButton
        name="caretleft"
        onPress={onBackwardPressed}
        disabled={onBackwardDisabled}
      />
      <FilledCard style={[styles.gameCard]}>
        {content && <Text style={textStyles}>{content}</Text>}
      </FilledCard>
      <FilledIconButton
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
