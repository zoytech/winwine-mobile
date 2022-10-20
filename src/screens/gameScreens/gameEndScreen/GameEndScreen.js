import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Typography} from 'src/themes';
import {FilledButton, OutlinedButton, OutlinedCard} from 'src/components';
import {StandardHeader} from './components';
import {ScreenKeys} from '../../../navigations/ScreenKeys';
import {cardDeckSelector} from 'src/redux/selectors';
import {loadCardDeckById} from 'src/redux/actions';

const screenWidth = Dimensions.get('screen').width;
export default function GameEndScreen(props) {
  const {
    navigation,
    route,
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.title.medium,
    supportingTextTypo = Typography.title.medium,
    buttonTypo = Typography.label.large,
    style,
    ...otherProps
  } = props;

  const {deckId} = route.params;
  const dispatch = useDispatch();
  const cardDeckItem = useSelector(cardDeckSelector);
  const {tag: tag, uri: uri, cardDeck: name} = cardDeckItem || {};

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch]);

  const description = 'Bạn đã chơi hết rồi';
  const handlePressFilledButton = () => {
    navigation.navigate(ScreenKeys.HOME, {
      deckId: deckId || '',
    });
  };
  const handlePressOutlinedButton = () => {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: deckId || '',
      },
      merge: true,
    });
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
    aspectRatio: 4,
  },
  media: {
    width: '100%',
    aspectRatio: 1.2,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
