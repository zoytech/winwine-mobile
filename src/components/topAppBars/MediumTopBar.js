import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function MediumTopBar(props) {
  const {
    content,
    subContent,
    leadingIcon,
    onLeadingIconPress = () => {},
    style,
    contentStyle,
    rightContainerStyle,
    renderRightComponents = () => {},
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const containerStyle = [
    styles.container,
    {
      backgroundColor: surface,
    },
    style,
  ];
  const actionBarStyle = [
    styles.actionBar,
    getDisplayOfHeader(subContent)?.container,
  ];
  const titleBarStyle = [
    styles.titleBar,
    getDisplayOfHeader(subContent)?.headerContainer,
  ];

  const mainContentStyle = [
    Typography.headline.small,
    {color: onSurface},
    getDisplayOfHeader(subContent)?.headerText,
    contentStyle,
  ];

  const subContentStyle = [
    Typography.title.small,
    {color: onSurface},
    contentStyle,
  ];

  function getDisplayOfHeader(subHeader) {
    return {
      container: {
        alignItems: subHeader ? 'flex-end' : 'center',
      },
      headerContainer: {
        justifyContent: subHeader ? 'flex-start' : 'center',
      },
      headerText: {
        alignSelf: subHeader && 'center',
      },
    };
  }

  function renderRight({iconStyle}) {
    //Can add more style if needed, not just iconStyle, Example: defaultContentStyle,...
    if (typeof renderRightComponents === 'function') {
      return renderRightComponents({iconStyle});
    }
    return renderRightComponents;
  }

  function renderSubContent(subHeader) {
    return (
      <View>
        {subHeader && (
          <Text numberOfLines={1} style={subContentStyle}>
            {subHeader}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={actionBarStyle}>
        <StandardIconButton
          name={leadingIcon}
          onPress={onLeadingIconPress}
          style={styles.icon}
        />
        {subContent && renderSubContent(subContent)}
        <View style={[styles.rightContainer, rightContainerStyle]}>
          {renderRight({iconStyle: styles.icon})}
        </View>
      </View>
      <View style={titleBarStyle}>
        <Text numberOfLines={1} style={mainContentStyle}>
          {content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 112,
    paddingBottom: 24,
  },
  titleBar: {
    height: '50%',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
  rightContainer: {
    flexDirection: 'row',
  },
});

/*
<View style={styles.iconDisplay}>
        {trailingIcons &&
          trailingIcons.map(({name, handlePress}) =>
            renderIconButtonItem(name, handlePress),
          )}
      </View>
 */
