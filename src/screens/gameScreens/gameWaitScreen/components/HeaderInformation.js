import {StyleSheet, Text, View} from 'react-native';
import {BaseAvatarButton} from 'src/components';
import {Color, ColorVariant} from 'src/themes';
import {TagName} from '../../../components';

export default function HeaderInformation(props) {
  const {
    head,
    tag,
    total,
    avatar,
    userName,
    description,
    totalLike,
    children,
    style,
    contentStyle,
    headStyle,
    ...otherProps
  } = props;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const totalCard = `${total} lá`;
  const containerStyle = [styles.container, style];
  const subContentStyle = [{color: textColor}, contentStyle];

  function renderSeparatorLine() {
    return <Text style={styles.subInfoSeparator}>||</Text>;
  }

  function renderUserInfoComponent() {
    return (
      <View style={styles.userDisplay}>
        {avatar ? (
          <BaseAvatarButton avatar={avatar} contentStyle={styles.userAvatar} />
        ) : null}
        {userName ? (
          <Text style={[subContentStyle, styles.userName]}>{userName}</Text>
        ) : null}
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
        {head ? (
          <Text {...textProps} style={defaultHeadStyle}>
            {head}
          </Text>
        ) : null}
        {description ? (
          <Text {...textProps} style={subContentStyle}>
            {description}
          </Text>
        ) : null}
      </View>
    );
  }

  function renderOtherInfoComponents() {
    return (
      <View style={styles.subInfo}>
        {tag ? <Text style={subContentStyle}>{tag}</Text> : null}
        {renderSeparatorLine()}
        {total ? <Text style={subContentStyle}>{totalCard}</Text> : null}
        {renderSeparatorLine()}
        {totalLike ? (
          <TagName
            icon={'like1'}
            content={`${totalLike}`}
            contentStyle={subContentStyle}
            iconStyle={styles.likeIcon}
          />
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
    justifyContent: 'space-around',
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
  },
  subInfoSeparator: {
    paddingHorizontal: 4,
  },
  userDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'space-around',
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
