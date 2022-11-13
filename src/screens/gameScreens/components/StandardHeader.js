import {StyleSheet, Text, View} from 'react-native';
import {FilledIconButton, StandardCard} from 'src/components';
import {Color, ColorVariant} from 'src/themes';
import {TagName} from '../../components';

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

  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const defaultContainerStyle = [styles.container, style];
  const headStyles = [headStyle, {color: textColor}];
  const subHeadStyles = [subHeadStyle, {color: textColor}];

  return (
    <StandardCard {...otherProps} style={defaultContainerStyle}>
      {children}
      <View style={styles.leadingIcon}>
        <FilledIconButton style={styles.buttonIconArea} />
      </View>
      <View style={styles.content}>
        {head && <Text style={headStyles}>{head}</Text>}
        <View style={styles.subHead}>
          {subHeadLeft && (
            <TagName
              content={subHeadLeft}
              icon={'tago'}
              style={styles.subHeadLeft}
              contentStyle={subHeadStyles}
              iconStyle={styles.tagIcon}
            />
          )}
          {subHeadRight && <Text style={subHeadStyles}>{subHeadRight}</Text>}
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
  tagIcon: {
    paddingRight: 10,
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
