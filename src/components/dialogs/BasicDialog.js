import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {Divider} from '../divider';
import {TextButton} from '../buttons';
import {FilledCard} from '../cards';

const screenWidth = Dimensions.get('screen').width;

export function BasicDialog(props) {
  const {
    icon,
    headline,
    supportingText,
    mainAction,
    subAction,
    hasDivider,
    onMainActionPress,
    onSubActionPress,
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const secondaryColor = Color.light[ColorVariant.secondary]?.base;
  const onSurfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const layoutColor =
    StateLayers.light[StateLayersVariant.onSurface]?.level_032;
  const containerStyle = [styles.container, {backgroundColor: layoutColor}];
  const dialogStyle = [
    styles.dialog,
    {
      backgroundColor: surface,
      alignItems: icon && 'center',
    },
    style,
  ];
  const headlineStyle = [{color: onSurface}, Typography.headline.small];
  const supportingTextStyle = [
    {color: onSurfaceVarColor},
    Typography.body.medium,
  ];
  const actionStyle = [
    styles.action,
    {justifyContent: icon ? 'center' : 'flex-end'},
  ];

  const iconProps = {
    name: icon,
    size: 24,
    color: secondaryColor,
  };

  return (
    <View style={containerStyle}>
      <View {...otherProps} style={dialogStyle}>
        <View style={styles.icon}>{icon && <Icon {...iconProps} />}</View>
        <View style={styles.headline}>
          {headline && <Text style={headlineStyle}>{headline}</Text>}
        </View>
        <View style={styles.supportingText}>
          {supportingText && (
            <Text style={supportingTextStyle}>{supportingText}</Text>
          )}
        </View>
        <View>{hasDivider && <Divider style={styles.divider} />}</View>
        <View style={actionStyle}>
          <TextButton
            content={subAction}
            style={styles.button}
            onPress={onSubActionPress}
          />
          <TextButton
            content={mainAction}
            style={styles.button}
            onPress={onMainActionPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    aspectRatio: 9 / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    borderRadius: 28,
    width: 312,
    padding: 24,
    flexDirection: 'column',
  },
  icon: {
    paddingBottom: 16,
  },
  headline: {},
  supportingText: {
    paddingTop: 16,
  },
  divider: {
    borderWidth: 1,
  },
  action: {
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingLeft: 8,
  },
});
