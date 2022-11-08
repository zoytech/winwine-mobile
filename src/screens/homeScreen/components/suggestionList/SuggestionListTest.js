import React, {createContext, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BasicDialog, SuggestionChip} from 'src/components';
import {ScreenKeys} from '../../../../navigations/ScreenKeys';

const ToggleContext = createContext();
const defaultChipId = 'HTG1';

function ComingSoonContent({onMainActionPress}) {
  return (
    <BasicDialog.Content
      headline={'Exit this game ?'}
      supportingText={'Leave and return to the home screen.'}
      mainAction={'EXIT'}
      onMainActionPress={onMainActionPress}
    />
  );
}

export default function SuggestionList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const [selectedChip, setSelectedChip] = useState(defaultChipId);

  function handleMainDialogPress() {
    setSelectedChip(defaultChipId);
    navigation.goBack();
  }

  function handleItemPressed(hashtagId) {
    setSelectedChip(hashtagId);
    const navigate = navigation.navigate;
    if (hashtagId === 'HTG2') {
      navigate({
        name: ScreenKeys.BASIC_DIALOG,
        params: {
          content: (
            <ComingSoonContent onMainActionPress={handleMainDialogPress} />
          ),
        },
      });
    } else {
      navigate({
        name: ScreenKeys.BASIC_DIALOG,
        params: {
          content: (
            <View>
              <Text>Some other customize view</Text>
            </View>
          ),
        },
      });
    }
  }

  function renderItem({item}, children) {
    const {content, hashtagId} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={hashtagId}
        content={content}
        selected={hashtagId === selectedChip}
        onPress={() => handleItemPressed(hashtagId)}>
        {children}
      </SuggestionChip>
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
