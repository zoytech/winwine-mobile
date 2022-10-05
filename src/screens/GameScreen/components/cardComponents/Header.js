import {StyleSheet, View} from 'react-native';
import {Content, Icons, MonoGram} from '../headerComponent';

export default function Header(props) {
  const {icon, monogram, children, style} = props;
  const containerStyle = [styles.container, style];
  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        {monogram && (
          <View style={styles.monogram}>
            <MonoGram initial={monogram} />
          </View>
        )}
        <Content style={styles.text}>{children}</Content>
      </View>
      {icon && (
        <View style={styles.icon}>
          <Icons initial={icon} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    flexDirection: 'column',
  },
  monogram: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
