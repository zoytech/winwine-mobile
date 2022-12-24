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
    onStaringDeckPress = () => {},
    onDownloadDeckPress = () => {},
    onNavigateMoreActionPress = () => {},
    onLayoutImage = () => {},
    ...otherProps
  } = props;

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
      <HeaderButtons
        onStaringDeckPress={onStaringDeckPress}
        onDownloadDeckPress={onDownloadDeckPress}
        onNavigateMoreActionPress={onNavigateMoreActionPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
