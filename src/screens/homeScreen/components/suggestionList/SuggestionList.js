import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import ComingSoonDialog from './ComingSoonDialog';

export default function SuggestionList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const defaultChipId = 'HTG1';
  const [selectedChip, setSelectedChip] = useState(defaultChipId);

  function handleMainDialogPress() {
    setSelectedChip(defaultChipId);
    navigation.goBack();
  }

  function handleChipPressed(hashtagId) {
    setSelectedChip(hashtagId);
    const navigate = navigation.navigate;
    if (hashtagId === 'HTG2') {
      navigate({
        name: ScreenKeys.BASIC_DIALOG,
        params: {
          content: (
            <ComingSoonDialog onMainActionPress={handleMainDialogPress} />
          ),
        },
      });
    }
  }

  function renderItem({item}) {
    const {content, hashtagId} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={hashtagId}
        content={content}
        selected={hashtagId === selectedChip}
        onPress={() => handleChipPressed(hashtagId)}
      />
    );
  }

  return (
    <FlatList
      horizontal={true}
      listKey={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={<View style={styles.separator} />}
      contentContainerStyle={[styles.contentContainer]}
      style={[styles.container, style]}
      data={data}
      renderItem={renderItem}
    />
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  separator: {
    width: 12,
  },
});
