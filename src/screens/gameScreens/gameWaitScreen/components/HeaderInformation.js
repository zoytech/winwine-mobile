import {StyleSheet, Text, View} from 'react-native';
import {BaseAvatarButton} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';
import {LikeIcon} from 'src/screens/components';
import {DECK, OWNER} from 'src/constants';

export default function HeaderInformation(props) {
  const {
    data,
    children,
    style,
    contentStyle = Typography.label.large,
    headStyle = Typography.headline.small,
    ...otherProps
  } = props;
  const {
    cardDeckName,
    hashtags,
    numberOfCards,
    ownerName,
    ownerAvatar,
    cardDeckDescription,
    cardDeckLike,
  } = data;
  const deckName = cardDeckName ? cardDeckName : DECK?.NAME;
  const deckTags = hashtags ? hashtags : DECK?.HASHTAGS;
  const totalCards = numberOfCards ? numberOfCards : DECK?.NUMBER_OF_CARDS;
  const userName = ownerName ? ownerName : OWNER?.NAME;
  const userAvatar = ownerAvatar ? ownerAvatar : OWNER?.AVATAR;

  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const totalCard = `${totalCards} lá`;
  const likes = `${cardDeckLike}`;
  const containerStyle = [styles.container, style];
  const subContentStyle = [{color: textColor}, contentStyle];

  function renderSeparatorLine() {
    return <Text style={styles.subInfoSeparator}>||</Text>;
  }

  function renderUserInfoComponent() {
    return (
      <View style={styles.userDisplay}>
        <BaseAvatarButton
          avatar={userAvatar}
          contentStyle={styles.userAvatar}
        />
        <Text style={[subContentStyle, styles.userName]}>{userName}</Text>
      </View>
    );
  }

  function renderHeadlineComponents() {
    const defaultHeadStyle = [subContentStyle, headStyle, styles.title];
    const textProps = {
      numberOfLines: 2,
    };

    return (
      <View>
        <Text {...textProps} style={defaultHeadStyle}>
          {deckName}
        </Text>
        {cardDeckDescription && (
          <Text {...textProps} style={subContentStyle}>
            {cardDeckDescription}
          </Text>
        )}
      </View>
    );
  }

  function renderOtherInfoComponents() {
    return (
      <View style={styles.subInfo}>
        {deckTags.map((hashtag, index) => (
          <Text key={index} style={subContentStyle}>
            {hashtag}
          </Text>
        ))}
        {renderSeparatorLine()}
        <Text style={subContentStyle}>{totalCard}</Text>
        {cardDeckLike ? (
          <>
            {renderSeparatorLine()}
            <LikeIcon
              contentStyle={subContentStyle}
              content={likes}
              iconStyle={styles.icon}
            />
          </>
        ) : null}
      </View>
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      {renderHeadlineComponents()}
      {renderUserInfoComponent()}
      {renderOtherInfoComponents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  subInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  subInfoSeparator: {
    paddingHorizontal: 4,
  },
  userDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    paddingTop: 8,
  },
  userAvatar: {
    width: 20,
    height: 20,
  },
  userName: {
    paddingLeft: 4,
    fontWeight: 'bold',
  },
  likeIcon: {
    paddingRight: 2,
  },
});
