import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CenterAlignedTopBar, SpinnerType1} from 'src/components';
import avatarTest from 'src/assets/images/preview-package/user.png';
import {SuggestionList} from '../suggestionList';
import {loadCardDeckList} from 'src/redux/actions';
import {usePartOfDay} from '../usePartOfDay';
import {
  cardDeckListSelector,
  requestingDeckListSelector,
} from 'src/redux/selectors';
import {forwardRef, useEffect} from 'react';

const HEADER_MIN_HEIGHT = 64;

const CustomTopAppBar = forwardRef(function CustomTopAppBar(props, ref) {
  const {navigation, style, ...otherProps} = props;
  const dispatch = useDispatch();
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);
  const suggestData = cardDeckList?.suggestData;
  const {currentPart} = usePartOfDay();

  useEffect(() => {
    dispatch(loadCardDeckList());
  }, [dispatch]);

  if (requesting) {
    <SpinnerType1 style={{height: HEADER_MIN_HEIGHT}} />;
  }
  return (
    <CenterAlignedTopBar
      {...otherProps}
      content={currentPart.greetingContent}
      style={[styles.container, style]}
      headerTitleStyle={styles.headerTitle}
      trailingIcon={avatarTest}
      onTrailingIconPress={() => alert('test leading button')}
      ref={ref}>
      <SuggestionList
        data={suggestData}
        navigation={navigation}
        style={styles.suggestion}
      />
    </CenterAlignedTopBar>
  );
});
export default CustomTopAppBar;

const styles = StyleSheet.create({
  container: {},
  headerTitle: {
    justifyContent: 'flex-start',
  },
  suggestion: {
    height: HEADER_MIN_HEIGHT,
  },
});
