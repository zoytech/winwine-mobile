import React, {useState, createContext, useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BasicDialog, SuggestionChip} from 'src/components';
import {BasicDialogProvider} from '../../../modalScreens';

const ToggleContext = createContext();
const defaultChipId = 'HTG1';

function ComingSoonContent() {
  const navigation = useNavigation();
  const {isSelectedChip, setIsSelectedChip} = useContext(ToggleContext);

  function handleMainActionPress() {
    setIsSelectedChip(defaultChipId);
    navigation.goBack();
  }

  return (
    <BasicDialogProvider
      headline={'Exit this game ?'}
      supportingText={'Leave and return to the home screen.'}
      mainAction={'EXIT'}
      onMainActionPress={handleMainActionPress}
    />
    // <BasicDialog value={{selectedChip, setSelectedChip}}>
    //   <BasicDialog.Content onMainActionPress={handleMainActionPress} />
    // </BasicDialog>
  );
}

export default function SuggestionList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const [selectedChip, setSelectedChip] = useState(defaultChipId);

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
