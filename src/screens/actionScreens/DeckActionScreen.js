import {StyleSheet, View} from 'react-native';
import ActionContainer from './components/ActionContainer';
import ActionItem from './components/ActionItem';
import {Color, ColorVariant, Typography} from 'src/themes';
import {useState} from 'react';

const actions = {
  SAVE: 'Lưu',
  PIN: 'Ghim lên đầu',
  LIKE: 'Yêu thích',
};

export default function DeckActionScreen({navigation, route}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isStared, setIsStared] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  function handleGoBackPress() {
    navigation.goBack();
  }

  function handleSavingPress() {
    if (isSaved) {
      console.log('will unmount save method');
      setIsSaved(false);
    } else {
      console.log('will update save method');
      setIsSaved(true);
    }
  }

  function handlePinningPress() {
    if (isPinned) {
      console.log('will unmount pin method');
      setIsPinned(false);
    } else {
      console.log('will update pin method');
      setIsPinned(true);
    }
  }

  function handleStaringPress() {
    if (isStared) {
      console.log('will unmount star method');
      setIsStared(false);
    } else {
      console.log('will update star method');
      setIsStared(true);
    }
  }

  function renderListOfButtons() {
    const itemProps = {
      style: styles.actionItem,
      contentStyle: styles.contentStyle,
    };

    return (
      <>
        <ActionItem
          {...itemProps}
          content={actions?.SAVE}
          name={'circledowno'}
          selectedName={'circledown'}
          onButtonToggle={handleSavingPress}
        />
        <ActionItem
          {...itemProps}
          content={actions?.PIN}
          name={'pushpino'}
          selectedName={'pushpin'}
          onButtonToggle={handlePinningPress}
        />
        <ActionItem
          {...itemProps}
          content={actions?.LIKE}
          name={'staro'}
          selectedName={'star'}
          onButtonToggle={handleStaringPress}
        />
      </>
    );
  }

  return (
    <ActionContainer onPress={handleGoBackPress}>
      <View style={styles.container}>{renderListOfButtons()}</View>
    </ActionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Color.light[ColorVariant.background]?.base,
  },
  actionItem: {
    width: '100%',
    height: '30%',
  },
  contentStyle: {
    ...Typography.title.medium,
  },
});
