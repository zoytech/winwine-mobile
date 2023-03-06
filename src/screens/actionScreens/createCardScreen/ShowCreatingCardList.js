import {FlatList, StyleSheet, View} from 'react-native';
import {BaseHeadline} from '../createDeckScreen/components';
import {Color, ColorVariant, Typography} from 'src/themes';
import CreatingCardList from './CreatingCardItem';

export default function ShowCreatingCardList(props) {
  const {data, ...otherProps} = props;

  function renderCreatingCardItem({item, index}) {
    const cardTitle = item?.cardTitle;
    return <CreatingCardList content={cardTitle} />;
  }

  return (
    <View {...otherProps}>
      <View>
        <BaseHeadline content={'Các lá bài khác'} />
      </View>
      <FlatList
        data={data}
        renderItem={renderCreatingCardItem}
        horizontal={true}
        ItemSeparatorComponent={<View style={{width: 6}} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    width: 156,
    aspectRatio: 0.64,
  },
  cardContent: {
    ...Typography.heading.small,
    color: Color.light[ColorVariant.primary]?.onContainer,
  },
});
