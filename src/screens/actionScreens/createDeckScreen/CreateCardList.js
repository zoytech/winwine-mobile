import {StyleSheet, Text, View} from 'react-native';
import CreatingCardItem from '../createCardScreen/CreatingCardItem';
import {StandardIconButton} from '../../../components';

export default function CreateCardList(props) {
  const {data, style, contentStyle, iconStyle, ...otherProps} = props;
  const defaultContainerStyle = [styles.container, style];
  console.log('data: ', data);

  function renderCardItem({cardTitle}, index) {
    return (
      <View style={styles.itemContainer} key={index}>
        <View>
          <CreatingCardItem content={cardTitle} />
        </View>
        <View>
          <Text />
        </View>
        <View>
          <StandardIconButton />
        </View>
      </View>
    );
  }

  return (
    <View {...otherProps} style={defaultContainerStyle}>
      {data.map(renderCardItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  itemContainer: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    width: '100%',
    aspectRatio: 2.69,
  },
});
