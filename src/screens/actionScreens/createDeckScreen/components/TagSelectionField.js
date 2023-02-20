import {SuggestionChip} from 'src/components';
import {FlatList, StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {Color, ColorVariant} from 'src/themes';

export default function TagSelectionField(props) {
  const {data, style, onSelectChipOption = () => {}, ...otherProps} = props;
  const [selectedChip, setSelectedChip] = useState(null);

  const backgroundColor = Color.light[ColorVariant.background]?.base;

  function handleSelectChipId(tagId) {
    onSelectChipOption(tagId);
    if (tagId === selectedChip) {
      setSelectedChip(null);
    } else {
      setSelectedChip(tagId);
    }
  }

  function renderItem({item}) {
    const {tagChipId: tagChipId, tagChipContent: content} = item || {};
    const chipStyle = [styles.chipLayout, {backgroundColor: backgroundColor}];
    return (
      <View style={chipStyle}>
        <SuggestionChip
          {...otherProps}
          key={tagChipId}
          content={content}
          style={styles.chip}
          selected={selectedChip === tagChipId}
          onPressOut={() => handleSelectChipId(tagChipId)}
        />
      </View>
    );
  }

  return (
    <>
      <FlatList
        {...otherProps}
        data={data}
        renderItem={({item}) => renderItem({item})}
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={<View style={styles.separator} />}
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
