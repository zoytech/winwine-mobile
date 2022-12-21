import {StyleSheet, View} from 'react-native';
import ActionContainer from './components/ActionContainer';
import ActionItem from './components/ActionItem';
import {Color, ColorVariant, Typography} from 'src/themes';
import {useState} from 'react';

const actions = {
  SAVE: 'Lưu',
  PIN: {
    SET: 'Ghim lên đầu',
    REMOVE: 'Huỷ ghim',
  },
  LIKE: 'Yêu thích',
};
export default function DeckActionScreen({navigation, route}) {
  const {onPinningPress = () => {}, hasPinnedId} = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const [isStared, setIsStared] = useState(false);

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
    onPinningPress();
    handleGoBackPress();
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
    const pinContent = hasPinnedId ? actions?.PIN.REMOVE : actions?.PIN.SET;

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
          content={pinContent}
          name={'pushpino'}
          selectedName={'pushpin'}
          onButtonToggle={handlePinningPress}
          isSelected={hasPinnedId}
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
