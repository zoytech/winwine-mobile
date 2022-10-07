import {StyleSheet, Text, View} from 'react-native';
import {ElevatedCard, FilledIconButton} from '../../../../components';

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

/*
function Icons(props) {
  const {
    initial,
    typography = Typography.body.small,
    colorVariant = ColorVariant.primary,
  } = props;
  const {base, onBase} = Color.light[colorVariant];
  const containerStyle = [styles.shape, {backgroundColor: base}];
  const textStyle = [styles.text, {color: onBase}, typography];
  return (
    <View style={containerStyle}>
      {initial && <Text style={textStyle}>{initial}</Text>}
    </View>
  );
}


 iconButtonStyle

  shape: {
      width: 16,
      height: 16,
  },
  text: {
      textTransform: 'uppercase',
      textAlign: 'center',
      textAlignVertical: 'center',
      height: '100%',
  },
 */
