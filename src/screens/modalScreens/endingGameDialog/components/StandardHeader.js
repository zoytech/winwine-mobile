import {StyleSheet, Text, View} from 'react-native';
import {FilledIconButton, StandardCard} from 'src/components';

export default function StandardHeader(props) {
  const {
    head,
    subHeadLeft,
    subHeadRight,
    children,
    headStyle,
    subHeadStyle,
    style,
    containerStyle,
    ...otherProps
  } = props;

  return (
    <StandardCard {...otherProps} style={[styles.container, style]}>
      {children}
      <View style={styles.leadingIcon}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
      <View style={styles.content}>
        {head && (
          <Text style={headStyle} numberOfLines={1} ellipsizeMode={'tail'}>
            {head}
          </Text>
        )}
        <View style={styles.subHead}>
          {subHeadLeft && <Text style={subHeadStyle}>{subHeadLeft}</Text>}
          {subHeadRight && <Text style={subHeadStyle}>{subHeadRight}</Text>}
        </View>
      </View>
    </StandardCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  leadingIcon: {
    width: '12%',
    justifyContent: 'center',
  },
  content: {
    width: '75%',
    aspectRatio: 4.4,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  subHead: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonIconArea: {
    width: 12,
    height: 12,
  },
});
