import {StyleSheet, Text, View} from 'react-native';
import {FilledIconButton, OutlinedCard} from '../../../../components';

export default function ElevatedHeader(props) {
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
  const leadingIconStyle = [styles.leadingIcon];
  const contentStyle = [styles.content];
  const subHeadStyles = [styles.subHead];

  return (
    <OutlinedCard
      {...otherProps}
      style={defaultContainerStyle}
      containerStyle={containerStyle}>
      <View style={leadingIconStyle}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
      <View style={contentStyle}>
        {head && <Text style={headStyle}>{head}</Text>}
        <View style={subHeadStyles}>
          {subHead1 && <Text style={subHeadStyle}>{subHead1}</Text>}
          {subHead2 && <Text style={subHeadStyle}>{subHead2}</Text>}
        </View>
      </View>
    </OutlinedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leadingIcon: {
    width: '12%',
    backgroundColor: 'greenyellow',
    justifyContent: 'center',
  },
  content: {
    width: '76%',
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
