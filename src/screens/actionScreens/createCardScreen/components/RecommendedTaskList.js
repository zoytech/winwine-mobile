import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

export default function RecommendedTaskList(props) {
  const {data, style, contentStyle} = props;
  const defaultContainerStyle = [styles.container, style];
  const defaultContentStyle = [styles.content, contentStyle];

  function renderItem(item) {
    const content = item?.task;
    return (
      <Pressable style={[styles.item, styles.separator]}>
        <Text style={defaultContentStyle}>{content}</Text>
      </Pressable>
    );
  }

  return <View style={defaultContainerStyle}>{data.map(renderItem)}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'coral',
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'gold',
    width: '100%',
    aspectRatio: 6,
  },
  separator: {
    marginTop: 16,
  },
});
