import {StyleSheet, Flatlist} from 'react-native';
import {TextInputHolder} from 'src/screens/actionScreens/components';
import {FilledCard} from '../../../../components';

const width = {
  CONTAINER: 320,
  CARD: 275,
  SEPARATOR: 10,
};
export default function TaskInputHolder(props) {
  const {style, contentStyle, ...otherProps} = props;
  const data = [1, 2, 3, 4, 5, 6, 7];

  function renderTaskInputItem({item, index}) {
    return <FilledCard key={index} />;
  }

  return (
    <TextInputHolder
      {...otherProps}
      multiline={true}
      contentStyle={contentStyle}
      selectTextOnFocus={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'violet',
  },
});
