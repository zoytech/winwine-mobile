import {StyleSheet, Text, View} from 'react-native';

//TODO: use absolute import instead (src/components)
import {
  ElevatedCard,
  FilledIconButton,
  StandardIconButton,
} from '../../../components';
import {DefaultHeaderStyle} from './defaultHeaderStyle';

//TODO: move defaultHeaderStyle into this file
export default function ElevatedHeader(props) {
  const {
    head,
    subHead1,
    subHead2,
    headStyle,
    subHeadStyle,
    style,
    children,
    ...otherProps
  } = props;
  const {container, trailingIcon, leadingIcon, content, subHead} =
    DefaultHeaderStyle;
  //TODO: why named it "defaultContainerStyle", should we use StyleSheet.compose
  const defaultContainerStyle = [container, style];
  const trailingIconStyle = [trailingIcon];
  const leadingIconStyle = [leadingIcon];
  const contentStyle = [content];
  const subHeadStyles = [subHead];

  return (
    <ElevatedCard {...otherProps} style={defaultContainerStyle}>
      {children}
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
      <View style={trailingIconStyle}>
        <StandardIconButton style={styles.buttonIconArea} />
      </View>
    </ElevatedCard>
  );
}

const styles = StyleSheet.create({
  buttonIconArea: {
    width: 16,
    height: 16,
    backgroundColor: 'gray',
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
