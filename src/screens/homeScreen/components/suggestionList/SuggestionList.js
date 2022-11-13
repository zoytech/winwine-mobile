import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  AssistChip,
  FilterChip,
  InputChip,
  SuggestionChip,
} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import ComingSoonDialog from './ComingSoonDialog';
import avatarTest from 'src/assets/images/preview-package/user.png';

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
        style={styles.chip}
        selected={hashtagId === selectedChip}
        onPress={() => handleChipPressed(hashtagId)}
        hasTrailingIcon={true}
        icon={'github'}
        // image={avatarTest}
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
    paddingLeft: 16,
    justifyContent: 'center',
  },
  separator: {
    width: 12,
  },
  chip: {
    borderRadius: 50,
  },
});
