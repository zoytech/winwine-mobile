import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';
import HeaderInformation from './HeaderInformation';
import HeaderImage from './HeaderImage';
import {OWNER} from '../../../../../constants';

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

  const {
    cardDeckNameParam,
    hashtagsParam,
    cardDeckImageParam,
    cardDeckDescriptionParam,
  } = cardDeckInfo;

  const containerStyle = [styles.container, style];

  return (
    <View {...otherProps} style={containerStyle}>
      <HeaderImage
        source={cardDeckImageParam}
        onLayoutImage={e => onLayoutImage(e)}
      />
      <HeaderInformation
        head={cardDeckNameParam}
        tag={hashtagsParam}
        userName={OWNER?.name}
        avatar={OWNER?.avatar}
        description={cardDeckDescriptionParam}
        headStyle={Typography.headline.small}
        contentStyle={Typography.label.large}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
