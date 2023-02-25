import {StyleSheet} from 'react-native';
import {TextInputHolder} from 'src/screens/actionScreens/components';
import {Carousel} from 'src/utils';
import {FilledCard} from '../../../../components';

const width = {
  CONTAINER: 320,
  CARD: 275,
  SEPARATOR: 10,
};
export default function TaskInputHolder(props) {
  const {style, contentStyle, ...otherProps} = props;
  const data = [1, 2, 3, 4, 5, 6, 7];

  function renderTaskInputItem() {
    return (
      <FilledCard>
        <TextInputHolder
          {...otherProps}
          multiline={true}
          contentStyle={contentStyle}
          selectTextOnFocus={true}
        />
      </FilledCard>
    );
  }

  return (
    <Carousel
      data={data}
      renderItem={renderTaskInputItem}
      itemWidth={width.CARD}
      containerWidth={width.CONTAINER}
      separatorWidth={width.SEPARATOR}
      style={[style, styles.container]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'violet',
  },
});
