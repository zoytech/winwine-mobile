import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

export default function RecommendedTaskList(props) {
  const {data, style, contentStyle} = props;
  const defaultContainerStyle = [styles.container, style];
  const defaultContentStyle = [styles.content, contentStyle];

  function renderItemSeparator() {
    return <View style={styles.separator} />;
  }

  function renderItem(item) {
    const content = item?.task;
    return (
      <Pressable style={styles.item}>
        <Text style={defaultContentStyle}>{content}</Text>
      </Pressable>
    );
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        style={defaultContainerStyle}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'coral',
    marginBottom: 2,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'gold',
    width: '100%',
    aspectRatio: 6,
  },
  separator: {
    height: 16,
  },
});
