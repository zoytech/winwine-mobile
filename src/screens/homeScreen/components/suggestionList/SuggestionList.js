import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import ComingSoonDialog from './ComingSoonDialog';

const chipId = {
  DRINKING_GAME: 'HTG1',
  TRUTH_DARE: 'HTG2',
};

export default function SuggestionList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const [selectedChip, setSelectedChip] = useState(chipId?.DRINKING_GAME);

  function handleMainDialogPress() {
    setSelectedChip(chipId?.DRINKING_GAME);
    navigation.goBack();
  }

  function handleChipPressed(hashtagId) {
    setSelectedChip(hashtagId);
    const navigate = navigation.navigate;
    if (hashtagId === chipId?.TRUTH_DARE) {
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
        style={styles.chip}
        selected={hashtagId === selectedChip}
        onPress={() => handleChipPressed(hashtagId)}
        hasTrailingIcon={true}
        // icon={'github'}
        // image={avatarTest}
      />
    );
  }

  return (
    <FlatList
      horizontal={true}
      listKey={true}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={<View style={styles.separator} />}
      contentContainerStyle={[styles.contentContainer]}
      style={[styles.container, style]}
      data={data}
      renderItem={renderItem}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
  contentContainer: {
    justifyContent: 'center',
  },
  separator: {
    width: 12,
  },
  chip: {
    borderRadius: 50,
  },
});
