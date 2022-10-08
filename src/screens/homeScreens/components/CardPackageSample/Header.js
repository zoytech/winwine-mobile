import {StyleSheet, Text, View} from 'react-native';
import {
  ElevatedCard,
  FilledIconButton,
  OutlinedCard,
} from '../../../../components';

export default function Header(props) {
  const {
    head,
    subHead1,
    subHead2,
    headStyle,
    subHeadStyle,
    style,
    containerStyle,
    children,
    ...otherProps
  } = props;

  const defaultContainerStyle = [styles.container, style];
  const subHeadStyles = [styles.subHead];

  return (
    <ElevatedCard
      {...otherProps}
      style={defaultContainerStyle}
      containerStyle={containerStyle}>
      {children}
      <View style={styles.leadingIcon}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
      <View style={styles.content}>
        {head && <Text style={headStyle}>{head}</Text>}
        <View style={subHeadStyles}>
          {subHead1 && <Text style={subHeadStyle}>{subHead1}</Text>}
          {subHead2 && <Text style={subHeadStyle}>{subHead2}</Text>}
        </View>
      </View>
      <View style={styles.trailingIcon}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
    </ElevatedCard>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trailingIcon: {
    width: '12%',
    justifyContent: 'center',
  },
  buttonIconArea: {
    backgroundColor: 'green',
    borderRadius: 12,
  },
});
