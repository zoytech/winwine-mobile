import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';
import {Color, ColorVariant} from 'src/themes';
import {remove} from 'src/utils';

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

  function renderItem(item) {
    const chipStyle = [styles.chipLayout, {backgroundColor: backgroundColor}];
    return (
      <View style={chipStyle} key={item}>
        <SuggestionChip
          {...otherProps}
          content={item}
          style={styles.chip}
          selected={selectedHashtags.includes(item)}
          onPress={() => handleSelectChipId(item)}
        />
      </View>
    );
  }

  return <View style={styles.container}>{data.map(renderItem)}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  separator: {
    width: 16,
  },
  chipLayout: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
