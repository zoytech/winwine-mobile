import {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FilledButton} from 'src/components';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return {error: true};
  }

  handleBackToHomeScreen() {
    alert('navigate');
  }

  render() {
    // const onBaseColor = Color.light[ColorVariant.error]?.onBase;
    if (this.state.error) {
      return (
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.content}>
              <Icon name={'exclamationcircle'} size={60} color={'red'} />
              <Text style={{fontSize: 32}}>Oops, Something Went Wrong</Text>
              <Text
                style={{marginVertical: 10, lineHeight: 23, fontWeight: '500'}}>
                The app ran into a problem and could not continue. We apologise
                for any inconvenience this has caused! Press the button below to
                restart the app and sign back in. Please contact us if this
                issue persists.
              </Text>
              <FilledButton
                content={'Back to Sign In Screen'}
                onPress={() => this.handleBackToHomeScreen()}
                style={{
                  marginVertical: 15,
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}

const styles = StyleSheet.create({});

export default ErrorBoundary;
