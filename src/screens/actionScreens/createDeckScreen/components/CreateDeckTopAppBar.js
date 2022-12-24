import {StyleSheet} from 'react-native';
import {SmallTopBar, StandardIconButton} from 'src/components';

export default function CreateDeckTopAppBar(props) {
  const {navigation, content, style, contentStyle, ...otherProps} = props;

  function renderRightComponents({iconStyle}) {
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  return (
    <SmallTopBar
      {...otherProps}
      content={content}
      subContent={'BẠN ĐANG CHƠI BỘ'}
      style={styles.container}
      leadingIcon={'arrowleft'}
      onLeadingIconPress={() => navigation.goBack()}
      RightComponents={renderRightComponents}
    />
  );
}

const styles = StyleSheet.create({
  headerButtonIcon: {
    borderRadius: 20,
    minWidth: 48,
    minHeight: 48,
  },
  content: {},
});
