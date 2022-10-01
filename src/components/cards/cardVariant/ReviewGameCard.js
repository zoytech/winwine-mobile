import {Color, Typography} from '../../../themes';
import cardItemLayout from './cardItemLayout';
import {StyleSheet, View} from 'react-native';
import {Action, Header, SupportingText} from '../cardComponents';
import {Heading, SubHeading} from '../cardComponents/headerComponent';
import {FilledButton} from '../../buttons';
import {ColorVariant} from '../../../themes/color';
import {MediumGameCard} from '../cardComponents/GameCardVariant';

export default function ReviewGameCard(props) {
  const {
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.label.medium,
    typoDescription = Typography.body.large,
    typoSupportingText = Typography.title.medium,
    typoButton = Typography.label.large,
    colorSurface = ColorVariant.surface,
    colorOutline = ColorVariant.outline,
  } = props;

  const {base} = Color.light[colorSurface];
  const {base: outline} = Color.light[colorOutline];

  const {
    container,
    headline: headlineStyle,
    header: headerStyle,
    action: actionStyle,
    supportingText: supportingTextStyle,
  } = cardItemLayout.fullscreen;
  const containerStyle = [
    container,
    {borderColor: outline, backgroundColor: base},
    styles.container,
  ];

  const headerStyles = [headerStyle, styles.header];
  const actionStyles = [actionStyle, styles.action];
  const supportingTextStyles = [
    supportingTextStyle,
    styles.supportingTextStyle,
  ];

  const description = 'Xem trước 10 lá';
  const {
    id: id,
    title: title,
    tag: tag,
    avatar: avatar,
    currentCard: currentCard,
    totalCards: totalCards,
  } = cardInfo;

  const handlePressFilledButton = () => {
    alert('move to game screen');
  };
  return (
    <View style={containerStyle}>
      <Header style={headerStyles} monogram={avatar}>
        <Heading content={title} contentStyle={typoHeader} />
        <SubHeading
          contentLeft={tag}
          contentRight={`Tổng số ${totalCards} lá`}
          contentStyle={typoSubHeader}
        />
      </Header>
      <SupportingText
        style={supportingTextStyles}
        description={description}
        descriptionStyle={typoSupportingText}
      />
      <MediumGameCard style={styles.gameCard} contentStyle={typoDescription} />
      <Action style={actionStyles}>
        <FilledButton
          content={'Chơi ngay'}
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
  supportingTextStyle: {
    flex: 1,
    alignItems: 'center',
  },
  gameCard: {
    flex: 5,
  },
  action: {
    flex: 1,
    backgroundColor: 'red',
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
