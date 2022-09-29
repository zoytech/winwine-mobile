import {View, StyleSheet} from 'react-native';
import headlineStyle from './headlineStyle';
import {MonoGram} from './index';
import HeadlineInfo from './HeadlineInfo';

export default function HeadlineBase(props) {
  const {children, style} = props;
  const containerStyle = [styles.container, style];

  return <View style={containerStyle}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    gap: 16,
    backgroundColor: 'blue',
  },
});
/*
{
        id: '2',
        title: 'Bai cua Anh Nam',
        tag: '18+',
        totalCards: '30',
    },
    {
        id: '3',
        title: 'Bai cua ABC',
        tag: '',
        totalCards: '30',
    }
 */
