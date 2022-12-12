import {forwardRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MediumTopBar, SpinnerType1, StandardIconButton} from 'src/components';
import {loadCardDeckList} from 'src/redux/actions';
import {requestingDeckListSelector} from 'src/redux/selectors';
import {defaultOfUser, heightOf} from 'src/constants';
import TagChipSection from './TagChipSection';

const minHeight = heightOf?.MIN_HEADER;
const chipTagArray = ['18+', 'Gud bro', 'Mới quen', 'Tới bến'];

function LibraryTopAppBar(props, ref) {
  const {navigation, style, ...otherProps} = props;
  const dispatch = useDispatch();
  const requesting = useSelector(requestingDeckListSelector);

  useEffect(() => {
    dispatch(loadCardDeckList());
  }, [dispatch]);

  if (requesting) {
    return <SpinnerType1 style={{height: minHeight}} />;
  }

  function handleAvatarPressed() {
    alert('handleAvatarPressed');
  }

  function renderRightComponents({iconStyle}) {
    const handleSearchPressed = () => {
      alert('handleSearchPressed');
    };
    const handleCreateNewPressed = () => {
      alert('handleCreateNewPressed');
    };
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleSearchPressed}
          style={[iconStyle, styles.headerButtonIcon]}
        />
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleCreateNewPressed}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  return (
    <MediumTopBar
      {...otherProps}
      content={'Thư viện'}
      style={[styles.container, style]}
      headerTitleStyle={styles.headerTitle}
      leadingIcon={defaultOfUser?.AVATAR}
      onLeadingIconPress={handleAvatarPressed}
      renderRightComponents={renderRightComponents}
      ref={ref}>
      <TagChipSection
        data={chipTagArray}
        navigation={navigation}
        style={styles.suggestion}
      />
    </MediumTopBar>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerTitle: {
    justifyContent: 'flex-start',
  },
  suggestion: {
    height: minHeight,
  },
});
export default forwardRef(LibraryTopAppBar);
