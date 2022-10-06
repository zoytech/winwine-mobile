import {Text, View} from 'react-native';
import {Typography} from 'src/themes';
import {
  ElevatedCard,
  StandardIconButton,
  FilledIconButton,
} from '../../../components';

export default function Headline(props) {
  const {
    header,
    tag,
    info,
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.label.large,
    children,
    ...otherProps
  } = props;

  const subHeadStyle = [styles.subHeading];

  return (
    <ElevatedCard {...otherProps}>
      {children}
      <View>
        <FilledIconButton />
      </View>
      <View style={containerStyle}>
        {header && <Text style={typoHeader}>{header}</Text>}
        <View style={subHeadStyle}>
          {tag && <Text style={typoSubHeader}>{tag}</Text>}
          {info && <Text style={typoSubHeader}>{info}</Text>}
        </View>
      </View>
      <StandardIconButton />
    </ElevatedCard>
  );
}

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
