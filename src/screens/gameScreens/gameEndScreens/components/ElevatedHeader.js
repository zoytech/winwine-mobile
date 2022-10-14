import {StyleSheet, Text, View} from 'react-native';
import {FilledIconButton, OutlinedCard, StandardCard} from 'src/components';

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
  const defaultContainerStyle = [styles.container, style];

  return (
    <StandardCard
      {...otherProps}
      style={defaultContainerStyle}
      containerStyle={containerStyle}>
      {children}
      <View style={styles.leadingIcon}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
      <View style={styles.content}>
        {head && <Text style={headStyle}>{head}</Text>}
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
    justifyContent: 'space-evenly',
  },
  leadingIcon: {
    width: '12%',
    justifyContent: 'center',
  },
  content: {
    width: '60%',
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
    width: 16,
    height: 16,
    backgroundColor: 'green',
  },
});
