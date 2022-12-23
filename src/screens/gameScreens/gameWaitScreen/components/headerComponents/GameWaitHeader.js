import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Typography} from 'src/themes';
import {FilledButton, SpinnerType1} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {loadCardDeckById} from 'src/redux/actions';
import {defaultOfDeck, defaultOfUser} from 'src/constants';
import HeaderButtons from './HeaderButtons';
import HeaderInformation from './HeaderInformation';
import HeaderImage from './HeaderImage';

export default function GameWaitHeader(props) {
  const {
    navigation,
    routeParams,
    cardDeckInfo,
    dataLength,
    style,
    onStaringDeckPress = () => {},
    onDownloadDeckPress = () => {},
    onNavigateMoreActionPress = () => {},
    onLayoutImage = () => {},
    ...otherProps
  } = props;
  const {deckId, deckTitle, deckSource} = routeParams;

  const {TITLE, TAG, IMAGE, DESCRIPTION, LIKES} = defaultOfDeck;
  const {NAME, AVATAR} = defaultOfUser;

  const {cardDeck, tag, uri} = cardDeckInfo;
  const user = {
    name: NAME,
    avatar: AVATAR,
  };
  const deck = {
    title: cardDeck ? cardDeck : TITLE,
    tag: tag ? tag : TAG,
    image: uri ? {uri: uri} : IMAGE,
    description: DESCRIPTION,
    likes: LIKES,
  };

  const containerStyle = [styles.container, style];

  function renderHeaderRightButtons({buttonStyle, contentButtonStyle}) {
    const handlePressFilledButton = () => {
      navigation.navigate({
        name: ScreenKeys.PLAY_GAME,
        params: {
          deckId: deckId,
          deckTitle: deckTitle ? deckTitle : TITLE,
          deckSource: deckSource ? deckSource : IMAGE,
        },
      });
    };
    return (
      <FilledButton
        content={'Chơi ngay'}
        style={buttonStyle}
        contentStyle={contentButtonStyle}
        onPress={handlePressFilledButton}
      />
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      <HeaderImage source={deck?.image} onLayoutImage={e => onLayoutImage(e)} />
      <HeaderInformation
        head={deck?.title}
        tag={deck?.tag}
        total={dataLength}
        userName={user?.name}
        avatar={user?.avatar}
        description={deck?.description}
        totalLike={deck?.likes}
        headStyle={Typography.headline.small}
        contentStyle={Typography.label.large}
      />
      <HeaderButtons
        onStaringDeckPress={onStaringDeckPress}
        onDownloadDeckPress={onDownloadDeckPress}
        onNavigateMoreActionPress={onNavigateMoreActionPress}
        renderRightComponents={renderHeaderRightButtons}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
