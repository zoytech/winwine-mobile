import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  FilledButton,
  OutlinedButton,
  SmallTopBar,
  SpinnerType1,
  StandardIconButton,
} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {EndingGameDialog, ExitGameDialog} from './components';
import GameCardItem from '../components/GameCardItem';
import {SwipeableGameCard3} from '../components';

const screenWidth = Dimensions.get('screen')?.width;
const itemWidth = screenWidth;
const cardWidth = itemWidth * 0.8;
const centerAlign = (screenWidth - cardWidth) / 2;

function Pagination({index}) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {tasks.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function GamePlayScreen({navigation, route}) {
  const {deckId, deckTitle} = route.params;
  const dispatch = useDispatch();
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const {
    tag: tag,
    uri: uri,
    cardDeck: headline,
    tasks: tasks = [],
  } = cardDeckItem || {};
  const totalTasks = tasks.length;
  const carouselRef = useRef();

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SmallTopBar
          content={deckTitle}
          leadingIcon={'arrowleft'}
          onLeadingIconPress={() => navigation.goBack()}
          renderRightComponents={renderRightComponents}
        />
      ),
    });
  }, [navigation]);

  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const textStyles = [Typography.body.large, {color: textColor}, styles.text];

  function handleNavigateEndGameDialog() {
    const handleMainDialogPress = () => {
      navigation.navigate({
        name: ScreenKeys.HOME,
      });
    };
    const handleSubDialogPress = () => {
      navigation.goBack();
      // index = 0;
    };
    navigation.navigate({
      name: ScreenKeys.CARD_DIALOG,
      params: {
        content: (
          <EndingGameDialog
            headline={headline}
            subHeadLeft={tag}
            media={uri}
            onMainActionPress={handleMainDialogPress}
            onSubActionPress={handleSubDialogPress}
          />
        ),
      },
    });
  }

  function handleNavigateExitGameDialog() {
    const handleMainDialogPress = () => {
      navigation.navigate({
        name: ScreenKeys.HOME,
      });
    };

    const handleSubDialogPress = () => {
      navigation.goBack();
    };

    navigation.navigate({
      name: ScreenKeys.BASIC_DIALOG,
      params: {
        content: (
          <ExitGameDialog
            onMainActionPress={handleMainDialogPress}
            onSubActionPress={handleSubDialogPress}
          />
        ),
      },
    });
  }

  function renderRightComponents({iconStyle}) {
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleNavigateExitGameDialog}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  function renderBottomButtons(index) {
    console.log('screenIndex: ', index);
    const handleLookBackButtonPressed = () => {};

    const handleContinueButtonPressed = () => {};

    return (
      <View style={styles.action}>
        <OutlinedButton
          content={'Lá trước'}
          style={styles.button}
          onPress={() => handleLookBackButtonPressed()}
          disabled={index === 0}
        />
        <FilledButton
          content={'Lá tiếp theo'}
          style={styles.button}
          onPress={
            index === totalTasks - 1
              ? handleNavigateEndGameDialog
              : handleContinueButtonPressed()
          }
        />
      </View>
    );
  }

  const renderCardGame = ({item, index}) => {
    function onPress() {
      carouselRef.current.scrollToIndex(index);
      console.log('index: ', index);
      alert('pressed');
    }

    return (
      <View style={styles.item} key={index} onPress={onPress}>
        <View style={styles.header}>
          <Text style={[Typography.label.large, textStyles]}>
            {`Lá thứ ${index + 1}/${totalTasks}`}
          </Text>
        </View>
        <Pressable onPress={onPress}>
          <GameCardItem content={item?.task} style={styles.card} />
        </Pressable>
      </View>
    );
  };

  if (requesting) {
    return <SpinnerType1 />;
  }

  return (
    <SafeAreaView style={defaultContainerStyle}>
      <View contentContainerStyle={styles.scrollView}>
        <SwipeableGameCard3
          data={tasks}
          ref={carouselRef}
          renderItem={renderCardGame}
          style={styles.gameCardLayout}
        />
        {/*{tasks.map((_, index) => renderBottomButtons(index))}*/}
        {renderBottomButtons()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    width: itemWidth,
    height: itemWidth * 1.4,
    borderColor: 'green',
    borderWidth: 0.5,
    paddingHorizontal: centerAlign,
  },
  header: {
    width: '100%',
    height: itemWidth / 7,
    paddingVertical: 16,
  },

  card: {
    width: cardWidth,
    height: cardWidth / 0.7,
  },
  gameCardLayout: {
    width: screenWidth,
    height: screenWidth * 1.4,
  },
  action: {
    width: '100%',
    aspectRatio: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  button: {
    minWidth: 120,
    height: 40,
  },
  headerButtonIcon: {
    borderRadius: 20,
    minWidth: 48,
    minHeight: 48,
  },
  paginationDotActive: {backgroundColor: 'blue'},
  paginationDotInactive: {backgroundColor: 'red'},
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

/*
 <SwipeableGameCard
            data={tasks}
            index={index}
            style={styles.gameCardLayout}
            itemStyle={styles.gameCardItem}
            cardStyle={styles.gameCard}
            contentStyle={textStyles}
          />
 */

/*
const handlePressFilledButton = () => {
    navigation.navigate(ScreenKeys.HOME, {
      deckId: deckId || '',
    });
  };
  const handlePressOutlinedButton = () => {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: deckId || '',
      },
      merge: true,
    });
  };
 */
