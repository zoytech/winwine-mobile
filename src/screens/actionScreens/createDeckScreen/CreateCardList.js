import {StyleSheet, Text, View} from 'react-native';
import CreatingCardItem from '../createCardScreen/CreatingCardItem';
import {StandardIconButton} from '../../../components';
import {Color, ColorVariant, Typography} from '../../../themes';
import {useEffect, useState} from 'react';
import {remove} from '../../../utils';

export default function CreateCardList(props) {
  const {
    data,
    style,
    contentStyle,
    iconStyle,
    onRemoveCardItem = () => {},
    ...otherProps
  } = props;
  const onPrimeContainerColor = Color.light[ColorVariant.primary]?.onContainer;
  const outlineColor = Color.light[ColorVariant.outline]?.base;
  const defaultContainerStyle = [styles.container, style];
  const defaultContentStyle = [
    styles.content,
    Typography.body.medium,
    {color: onPrimeContainerColor},
  ];
  const itemContainerStyle = [
    styles.itemContainer,
    {borderColor: outlineColor},
  ];

  function renderCardItem(item, index) {
    const {cardTitle, cardId} = item || {};
    return (
      <View style={itemContainerStyle} key={index}>
        <View style={styles.cardItemContainer}>
          <CreatingCardItem
            id={cardId}
            style={styles.cardItem}
            upperStyle={styles.idContainer}
            contentStyle={defaultContentStyle}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={defaultContentStyle}>{cardTitle}</Text>
        </View>
        <View style={styles.fabContainer}>
          <StandardIconButton
            name={'close'}
            onPress={() => onRemoveCardItem(item, cardId)}
          />
        </View>
      </View>
    );
  }

  return (
    <View {...otherProps} style={defaultContainerStyle}>
      {data.map(renderCardItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    width: '100%',
    aspectRatio: 2.69,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItemContainer: {
    width: '21%',
    height: '100%',
  },
  cardItem: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  idContainer: {
    padding: 4,
  },
  contentContainer: {
    width: '65%',
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {},
  fabContainer: {
    position: 'absolute',
    top: 6,
    left: 280,
  },
});
