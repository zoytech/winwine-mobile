import {StyleSheet} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {StandardIconButton} from 'src/components';

export default function SearchButton(props) {
  const {navigation, style, ...otherProps} = props;

  function handleSearchPressed() {
    navigation.navigate({
      name: ScreenKeys.SEARCH_LIB,
    });
  }

  return (
    <StandardIconButton
      {...otherProps}
      name={'search1'}
      onPress={handleSearchPressed}
      style={style}
    />
  );
}
const styles = StyleSheet.create({});
