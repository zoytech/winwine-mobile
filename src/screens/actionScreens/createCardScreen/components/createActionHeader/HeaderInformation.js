import {StyleSheet, Text, View} from 'react-native';
import {BaseAvatarButton, SuggestionChip} from 'src/components';
import {Color, ColorVariant} from 'src/themes';

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
      <View style={styles.mainContentLayout}>
        <View style={styles.headerLayout}>
          <Text {...textProps} style={defaultHeadStyle}>
            {head}
          </Text>
          <SuggestionChip
            style={styles.subInfo}
            content={tag}
            contentStyle={subContentStyle}
            selected={true}
          />
        </View>
        <View style={styles.headerLayout}>
          <Text {...textProps} style={subContentStyle}>
            {description}
          </Text>
        </View>
      </View>
    );
  }

  function renderOtherInfoComponents() {
    return (
      <SuggestionChip
        style={styles.subInfo}
        content={tag}
        contentStyle={subContentStyle}
        selected={true}
      />
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
    backgroundColor: 'gold',
  },
  mainContentLayout: {
    width: '100%',
    flexDirection: 'column',
  },
  headerLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    backgroundColor: 'coral',
  },
  title: {
    fontWeight: 'bold',
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
});