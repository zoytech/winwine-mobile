import {Color, Typography} from '../../../themes';
import cardItemLayout from './cardItemLayout';
import {View} from 'react-native';
import {
  Action,
  Header,
  Headline,
  Media,
  SupportingText,
} from '../cardComponents';
import {Heading, SubHeading} from '../cardComponents/headerComponent';
import {SubTitle, Title} from '../cardComponents/Headline';
import {FilledButton, OutlinedButton} from '../../buttons';
import {ColorVariant} from '../../../themes/color';

export default function CardBase(props) {
  const {
    typoHeader = Typography.title.medium,
    typoSubHeader = Typography.body.medium,
    typoTitle = Typography.body.large,
    typoButton = Typography.label.large,
    colorSurface = ColorVariant.surface,
    colorOutline = ColorVariant.outline,
  } = props;

  const {
    container,
    headline: headlineStyle,
    header: headerStyle,
    action: actionStyle,
    media: mediaStyle,
    supportingText: supportingTextStyle,
  } = cardItemLayout.fullscreen;
  const {base} = Color.light[colorSurface];
  const {base: outline} = Color.light[colorOutline];
  const containerStyle = [
    container,
    {borderColor: outline, backgroundColor: base},
  ];

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
      <Header style={headerStyle} icon={'A'} monogram={avatar}>
        <Heading content={title} contentStyle={typoHeader} />
        <SubHeading
          contentLeft={tag}
          contentRight={tag}
          contentStyle={typoSubHeader}
        />
      </Header>
      <Media
        style={mediaStyle}
        //TODO: refactor import image
        source={require('../../../assets/images/preview-package/member1.jpg')}
      />
      <Headline style={headlineStyle}>
        <Title content={title} contentStyle={typoTitle} />
        <SubTitle
          contentLeft={tag}
          contentRight={tag}
          contentStyle={typoSubHeader}
        />
      </Headline>
      <SupportingText style={supportingTextStyle} description={description} />
      <Action style={actionStyle}>
        <OutlinedButton
          content={'back now'}
          onPress={handlePressOutlinedButton}
        />
        <FilledButton
          content={'play now'}
          contentStyle={typoButton}
          onPress={handlePressFilledButton}
        />
      </Action>
    </View>
  );
}

const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};
