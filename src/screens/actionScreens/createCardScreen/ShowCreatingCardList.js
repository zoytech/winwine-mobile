import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BaseHeadline} from '../createDeckScreen/components';
import {FilledCard} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function ShowCreatingCardList(props) {
  const {data, ...otherProps} = props;

  function renderCreatingCardItem({item, index}) {
    const {cardTitle, cardDescription} = item || {};
    return (
      <FilledCard key={index} style={styles.cardContainer}>
        <Text style={styles.cardContent}>{cardTitle}</Text>
      </FilledCard>
    );
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
