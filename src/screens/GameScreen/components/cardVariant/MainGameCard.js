import {Color, Typography} from '../../../themes';
import cardItemLayout from './cardItemLayout';
import {StyleSheet, View} from 'react-native';
import {Action, Header} from '../cardComponents';
import {Heading, SubHeading} from '../cardComponents/headerComponent';
import {FilledButton} from '../../buttons';
import {ColorVariant} from '../../../themes/color';
import {LargeGameCard} from '../cardComponents/GameCardVariant';
import ElevatedButton from '../../buttons/ElevatedButton';

export default function MainGameCard(props) {
  const {
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.label.medium,
    typoDescription = Typography.body.large,
    typoButton = Typography.label.large,
    colorSurface = ColorVariant.surface,
    colorOutline = ColorVariant.outline,
  } = props;

  const {
    container,
    header: headerStyle,
    action: actionStyle,
  } = cardItemLayout.fullscreen;
  const {base} = Color.light[colorSurface];
  const {base: outline} = Color.light[colorOutline];
  const containerStyle = [
    container,
    {borderColor: outline, backgroundColor: base},
    styles.container,
  ];

  const headerStyles = [headerStyle, styles.header];
  const actionStyles = [actionStyle, styles.action];

  const description =
    'Để có được 10 đồng tiền vàng, một ông lão đã phải nhảy xuống biển nhặt nó. Vậy hỏi đồng tiền vàng đó nặng bao nhiêu?';
  const {
    id: id,
    title: title,
    tag: tag,
    avatar: avatar,
    currentCard: currentCard,
    totalCards: totalCards,
  } = cardInfo;

  const handlePressFilledButton = () => {
    alert('move to new card');
  };
  const handlePressOutlinedButton = () => {
    alert('move to previous card');
  };
  return (
    <View style={containerStyle}>
      <Header style={headerStyles} monogram={avatar}>
        <Heading content={title} contentStyle={typoHeader} />
        <SubHeading
          contentLeft={`Lá thứ ${currentCard}/${totalCards}`}
          contentStyle={typoSubHeader}
        />
      </Header>
      <LargeGameCard style={styles.gameCard} contentStyle={typoDescription} />
      <Action style={actionStyles}>
        <ElevatedButton
          content={'Lá trước'}
          onPress={handlePressOutlinedButton}
        />
        <FilledButton
          content={'Lá kế tiếp'}
          contentStyle={typoButton}
          onPress={handlePressFilledButton}
        />
      </Action>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 640,
  },
  header: {
    flex: 1,
  },
  gameCard: {
    flex: 5,
  },
  action: {
    flex: 2,
  },
});

const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};
