import {Color, Typography} from '../../../themes';
import cardItemLayout from './cardItemLayout';
import {StyleSheet, View} from 'react-native';
import {Action, Header, Media, SupportingText} from '../cardComponents';
import {Heading, SubHeading} from '../cardComponents/headerComponent';
import {FilledButton, OutlinedButton} from '../../buttons';
import {ColorVariant} from '../../../themes/color';

export default function EndGameCard(props) {
  const {
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.title.medium,
    typoButton = Typography.label.large,
    colorSurface = ColorVariant.surface,
    colorOutline = ColorVariant.outline,
  } = props;
  const {container, headerStyle, actionStyle, mediaStyle, supportingTextStyle} =
    cardItemLayout.fullscreen;
  const {base} = Color.light[colorSurface];
  const {base: outline} = Color.light[colorOutline];
  const containerStyle = [
    container,
    {borderColor: outline, backgroundColor: base},
    styles.container,
  ];
  const supportingTextStyles = [
    supportingTextStyle,
    styles.supportingText,
    typoSubHeader,
  ];
  const {id, title: namePackage, tag: category, avatar: initial} = cardInfo;
  const description = 'Bạn đã chơi hết rồi';

  const handlePressFilledButton = () => {
    alert('move to home screen');
  };
  const handlePressOutlinedButton = () => {
    alert('move to game screen');
  };
  return (
    <View style={containerStyle}>
      <Header style={headerStyle} monogram={initial}>
        <Heading content={namePackage} contentStyle={typoHeader} />
        <SubHeading contentLeft={category} contentStyle={typoSubHeader} />
      </Header>
      <Media
        style={mediaStyle}
        source={require('../../../assets/images/preview-package/member1.jpg')}
      />
      <SupportingText style={supportingTextStyles} description={description} />
      <Action style={actionStyle}>
        <OutlinedButton
          content={'Chơi lại'}
          onPress={handlePressOutlinedButton}
        />
        <FilledButton
          content={'Chơi bộ mới'}
          contentStyle={typoButton}
          onPress={handlePressFilledButton}
        />
      </Action>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 410,
  },
  supportingText: {
    alignItems: 'center',
    justifyContent: 'center',
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
