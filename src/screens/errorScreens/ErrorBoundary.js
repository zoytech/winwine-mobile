import {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FilledButton} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

const TITLE = 'Rất tiếc, đã xảy ra lỗi';
const DESCRIPTION =
  'Ứng dụng gặp sự cố và không thể tiếp tục. Chúng tôi xin lỗi vì sự bất tiện này! Lỗi sẽ được khắc phục trong thời gian sớm nhất.';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return {error: true};
  }

  render() {
    const {base: baseColor, onBase: onBaseColor} =
      Color.light[ColorVariant.background];
    const {base: errorColor, onBase: onErrorColor} =
      Color.light[ColorVariant.error];
    const containerStyle = [styles.container, {backgroundColor: baseColor}];
    const contentStyle = [{color: onBaseColor}];
    if (this.state.error) {
      return (
        <SafeAreaView>
          <View style={containerStyle}>
            <Icon
              name={'exclamationcircleo'}
              size={40}
              color={errorColor}
              style-={styles.iconDisplay}
            />
            <View style={styles.title}>
              <Text style={[contentStyle, Typography.title.large]}>
                {TITLE}
              </Text>
            </View>
            <Text
              style={[contentStyle, styles.description, Typography.body.large]}
              numberOfLines={7}>
              {DESCRIPTION}
            </Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
  },
  description: {
    paddingVertical: 10,
    alignContent: 'center',
    textAlign: 'center',
  },
  iconDisplay: {
    paddingTop: 50,
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    aspectRatio: 8,
    marginVertical: 15,
  },
});

export default ErrorBoundary;
