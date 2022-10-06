import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton} from '../../components';
import FilledIconButton from '../../components/iconButtons/toggleable/FilledIconButton';

const width = Dimensions.get('window').width,
  height = Dimensions.get('window').height;

export default function GameWaitScreen(props) {
  const {
    typoSupportingText = Typography.title.medium,
    typoBody = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;
  const {base} = Color.light[colorVariant];

  const defaultContainerStyle = [
    {backgroundColor: base},
    styles.container,
    style,
  ];
  const defaultContentStyle = [styles.content];
  const description = 'Xem trước 10 lá bài';

  const handlePressFilledButton = () => {
    alert('move to game screen');
  };

  function PackageInfo({header, tag, info}) {
    const containerStyle = [styles.container];
    const subHeaderStyle = [styles.subHeader];
    const contentStyle = [];
    return (
      <View style={containerStyle}>
        {header && (
          <Text style={[defaultContentStyle, typoHeader]}>{header}</Text>
        )}
        <View style={subHeaderStyle}>
          {tag && (
            <Text style={[defaultContentStyle, typoSubHeader]}>{tag}</Text>
          )}
          {info && <Text style={[contentStyle, typoSubHeader]}>{info}</Text>}
        </View>
      </View>
    );
  }

  function SupportingText({statement}) {
    const contentStyle = [typoSupportingText];
    return <>{statement && <Text style={contentStyle}>{statement}</Text>}</>;
  }

  function GameCard({icon: hasIcon, text}) {
    const containerStyle = [styles.gameCard];
    const contentStyle = [typoBody];
    console.log('question', text);
    return (
      <ElevatedCard style={containerStyle}>
        {hasIcon && <FilledIconButton content={hasIcon} />}
        {text && <Text style={contentStyle}>{text}</Text>}
      </ElevatedCard>
    );
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ElevatedCard style={[defaultContainerStyle, {height: height * '0.2'}]}>
        <View>
          <FilledIconButton />
        </View>
        <PackageInfo
          header={cardInfo?.title}
          subHead={cardInfo?.tag}
          info={cardInfo?.totalCards}
        />
      </ElevatedCard>
      <View style={[defaultContainerStyle, {height: height * '0.1'}]}>
        <SupportingText statement={description} />
      </View>
      <View style={[defaultContainerStyle, {height: height * '0.5'}]}>
        <GameCard icon={item?.icon} text={questionInfo?.question1} />
      </View>
      <View style={[defaultContainerStyle, {height: height * '0.2'}]}>
        <FilledButton content={'Chơi luôn'} onPress={handlePressFilledButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
  },
  gameCard: {
    width: width * 0.6,
    height: height * 0.5,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  background: {
    width: 16,
    height: 16,
  },
  monogram: {},
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
  subHeader: {},
});

const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};

const questionInfo = {
  question1:
    'Em yeu truong em voi bao ban than va co giao hien nhu yeu que huong cap sach den truong.',
};
const item = {};
