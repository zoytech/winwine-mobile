import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';
import {defaultOfDeck, defaultOfUser} from 'src/constants';
import HeaderButtons from './HeaderButtons';
import HeaderInformation from './HeaderInformation';
import HeaderImage from './HeaderImage';

export default function CreateActionHeader(props) {
  const {
    navigation,
    routeParams,
    cardDeckInfo,
    dataLength,
    style,
    onLayoutImage = () => {},
    ...otherProps
  } = props;

  const {TITLE, TAG, IMAGE} = defaultOfDeck;
  const {NAME, AVATAR} = defaultOfUser;

  const {deckTitle, deckTag, deckSource, deckDescription} = cardDeckInfo;
  const user = {
    name: NAME,
    avatar: AVATAR,
  };
  const deck = {
    title: deckTitle ? deckTitle : TITLE,
    tag: deckTag ? deckTag : TAG,
    image: deckSource ? deckSource : IMAGE,
    description: deckDescription ? deckDescription : '',
  };

  const containerStyle = [styles.container, style];

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
        headStyle={Typography.headline.small}
        contentStyle={Typography.label.large}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
