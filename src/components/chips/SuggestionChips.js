import {Elevation1} from '../elevations/Elevation';
import {TextContent} from '../content';
import {Pressable, StyleSheet} from 'react-native';

function SuggestionChipBase(props) {
  const {content = 'Drinking game', contentStyle, style, onPress} = props;
  const chipStyles = [style, styles.container];
  const contentStyles = [contentStyle];
  const onPressing = () => {
    alert('ALo afaj');
  };
  return (
    <Pressable onPress={onPressing} style={{display: 'flex'}}>
      <Elevation1 style={chipStyles}>
        <TextContent content={content} contentStyle={contentStyles} />
      </Elevation1>
    </Pressable>
  );
}

// function NormalElevatedChip(props) {}
//
// function HighlightElevatedChip(props) {}

export default SuggestionChipBase;
const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 32,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
});
