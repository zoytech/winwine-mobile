import {SuggestionChip} from 'src/components';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import {Color, ColorVariant} from 'src/themes';
import {remove} from '../../../../utils';

export default function TagSelectionField(props) {
  const {
    data,
    name,
    style,
    onSelectChipOption = () => {},
    ...otherProps
  } = props;
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const backgroundColor = Color.light[ColorVariant.background]?.base;

  function handleSelectChipId(tagId) {
    onSelectChipOption(tagId);
    if (selectedHashtags.includes(tagId)) {
      remove.elementAtMiddle(selectedHashtags, tagId);
      setSelectedHashtags([...selectedHashtags]);
    } else {
      setSelectedHashtags([...selectedHashtags, tagId]);
    }
  }

  function renderItem({item}) {
    const chipStyle = [styles.chipLayout, {backgroundColor: backgroundColor}];
    return (
      <View style={chipStyle}>
        <SuggestionChip
          {...otherProps}
          key={item}
          content={item}
          style={styles.chip}
          selected={selectedHashtags.includes(item)}
          onPress={() => handleSelectChipId(item)}
        />
      </View>
    );
  }

  return (
    <>
      <FlatList
        {...otherProps}
        data={data}
        renderItem={renderItem}
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={<View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 16,
  },
  chipLayout: {
    borderRadius: 8,
  },
});
