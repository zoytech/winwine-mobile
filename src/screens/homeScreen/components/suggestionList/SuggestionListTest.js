import React, {useState, createContext, useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {BasicDialog, SuggestionChip} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function SuggestionList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const defaultChipId = 'HTG1';
  const [selectedChip, setSelectedChip] = useState(defaultChipId);
  const ToggleContext = createContext();

  function ComingSoonContent() {
    const {isSelectedChip, setIsSelectedChip} = useContext(ToggleContext);

    function handleMainActionPress() {
      setIsSelectedChip(defaultChipId);
      navigation.goBack();
    }

    return (
      <BasicDialog.Container value={{selectedChip, setSelectedChip}}>
        <BasicDialog.Content onMainActionPress={handleMainActionPress} />
      </BasicDialog.Container>
    );
  }

  function handleItemPressed(hashtagId) {
    setSelectedChip(hashtagId);
    if (hashtagId === 'HTG2') {
      return <ComingSoonContent />;
    }
    return null;
  }

  function renderItem({item}, children) {
    const {content, hashtagId} = item || {};
    return (
      <ToggleContext.Provider>
        <SuggestionChip
          {...otherProps}
          key={hashtagId}
          content={content}
          selected={hashtagId === selectedChip}
          onPress={() => handleItemPressed(hashtagId)}>
          {children}
        </SuggestionChip>
      </ToggleContext.Provider>
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
