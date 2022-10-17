import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Typography} from 'src/themes';
import {FilledButton, OutlinedButton, OutlinedCard} from 'src/components';
import API from 'src/apis';
import {StandardHeader} from './components';

const screenWidth = Dimensions.get('screen').width;
export default function GameEndScreen(props) {
  const {
    deckId = 1,
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.title.medium,
    supportingTextTypo = Typography.title.medium,
    buttonTypo = Typography.label.large,
    style,
    ...otherProps
  } = props;

  const [cardDeckItem, setCardDeckItem] = useState([]);
  const {tag: tag, uri: uri, cardDeck: name} = cardDeckItem || {};
  useEffect(() => {
    getCurrentCardDeck(deckId);
  }, [deckId]);

  async function getCurrentCardDeck(cardDeckId) {
    const cardDeck = await API.getCardDeckById(cardDeckId);
    setCardDeckItem(cardDeck);
  }

  const description = 'Bạn đã chơi hết rồi';
  const handlePressFilledButton = () => {
    alert('move to home screen');
  };
  const handlePressOutlinedButton = () => {
    alert('move to game screen');
  };
  return (
    <SafeAreaView {...otherProps} style={styles.screenView}>
      <OutlinedCard style={styles.baseCard}>
        <StandardHeader
          head={name}
          subHeadLeft={tag}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <Image style={styles.media} source={{uri: uri}} />
        <View style={styles.supportingText}>
          {description && <Text style={supportingTextTypo}>{description}</Text>}
        </View>
        <View style={styles.action}>
          <OutlinedButton
            content={'Chơi lại'}
            onPress={handlePressOutlinedButton}
          />
          <FilledButton
            content={'Chơi bộ mới'}
            contentStyle={buttonTypo}
            onPress={handlePressFilledButton}
          />
        </View>
      </OutlinedCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenView: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseCard: {
    width: '80%',
    marginTop: 100,
  },
  header: {
    width: '100%',
    aspectRatio: 10 / 3,
  },
  media: {
    width: '100%',
    aspectRatio: 10 / 6,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 10 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 10 / 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
