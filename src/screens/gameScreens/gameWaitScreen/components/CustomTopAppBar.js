import {StyleSheet} from 'react-native';
import {SmallTopBar, StandardIconButton} from 'src/components';

export default function CustomTopAppBar(props) {
  const {navigation, routes, content, style, contentStyle, ...otherProps} =
    props;

  function handleShowSelectionList() {
    alert('handleShowSelectionList');
  }

  function renderRightComponents({iconStyle}) {
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleShowSelectionList}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  return (
    <SmallTopBar
      {...otherProps}
      content={''}
      leadingIcon={'arrowleft'}
      onLeadingIconPress={() => navigation.goBack()}
      renderRightComponents={renderRightComponents}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  headerButtonIcon: {
    borderRadius: 20,
    minWidth: 48,
    minHeight: 48,
  },
  image: {},
});
