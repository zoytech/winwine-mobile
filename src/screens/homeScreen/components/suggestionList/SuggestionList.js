import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {GAME_TAGS} from 'src/constants';
import ComingSoonDialog from './ComingSoonDialog';
import {normalizedBy} from 'src/utils';

export default function SuggestionList(props) {
  const {style, navigation, route, ...otherProps} = props;
  const gameTags = GAME_TAGS;
  const normalizedGameTags = gameTags.reduce(
    normalizedBy('gameTagContent'),
    {},
  );
  const DrinkingGame = normalizedGameTags['Drinking Game']?.gameTagContent;
  const TruthOrDare = normalizedGameTags['Truth Or Dare']?.gameTagContent;
  const [selectedChip, setSelectedChip] = useState(DrinkingGame);

  function handleChipPressed(hashtagId) {
    setSelectedChip(hashtagId);

    function handleMainDialogPress() {
      setSelectedChip(DrinkingGame);
      navigation.goBack();
    }

    const navigate = navigation.navigate;
    if (hashtagId === TruthOrDare) {
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
    const {gameTagContent, gameTagId} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={gameTagId}
        content={gameTagContent}
        style={styles.chip}
        selected={gameTagContent === selectedChip}
        onPress={() => handleChipPressed(gameTagContent)}
        hasTrailingIcon={true}
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
      data={gameTags}
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
