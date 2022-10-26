import {StyleSheet, Text, View} from 'react-native';
import {FilledCard, FilledIconButton, StandardCard} from 'src/components';

export default function StandardHeader(props) {
  const {
    head,
    subHeadLeft,
    subHeadRight,
    children,
    style,
    headStyle,
    subHeadStyle,
    ...otherProps
  } = props;

  const defaultContainerStyle = [styles.container, style];

  return (
    <StandardCard {...otherProps} style={defaultContainerStyle}>
      {children}
      <View style={styles.leadingIcon}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
      <View style={styles.content}>
        {head && <Text style={headStyle}>{head}</Text>}
        <View style={styles.subHead}>
          {subHeadLeft && (
            <Text style={[subHeadStyle, styles.subHeadLeft]}>
              {subHeadLeft}
            </Text>
          )}
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
    width: '76%',
    aspectRatio: 4.4,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  subHead: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subHeadLeft: {
    width: '50%',
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
