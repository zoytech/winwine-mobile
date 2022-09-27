import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {Surface1} from '../../components/elevations/SurfacesColor';
import {Elevation1, Elevation5} from '../../components/elevations/Elevation';

export default function HomeScreen(props) {
  const screenStyle = [styles.container, {backgroundColor: 'white'}];
  // const labelSelectionStyle = [styles.labelSelection]
  // const title1Style = [styles.title1]
  // const stackCardsRowStyle = [styles.stackCardsRow]
  // const title2Style = [styles.title2]
  // const screenView = [styles.screenView]
  // const stackCardsColumnStyle = [styles.stackCardsScroll]

  return (
    <SafeAreaView style={screenStyle}>
      {/*<View style={screenView}>*/}
      {/*    <View style={labelSelectionStyle}></View>*/}
      {/*    <View style={title1Style}></View>*/}
      {/*    <View style={stackCardsRowStyle}></View>*/}
      {/*    <View style={title2Style}></View>*/}
      {/*</View>*/}
      {/*<ScrollView style={stackCardsColumnStyle}>*/}
      {/*</ScrollView>*/}
      {/*<Surface1 />*/}
      <Elevation1 />
      <Elevation5 />
      {/*<View style={styles.square} />*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  square: {
    width: 200,
    height: 200,
    margin: 30,
    // backgroundColor: '#845400',
    backgroundColor: 'rgba(132, 84, 0, 0.5)',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    elevation: 1,

    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },

  // screenView: {
  //     display: 'flex',
  //     flex: 1
  // },
  // labelSelection: {
  //     flex: 2,
  //     backgroundColor: 'blue',
  // },
  // title1: {
  //     flex: 1,
  //     backgroundColor: 'deeppink',
  //
  // },
  // stackCardsRow: {
  //     flex: 4,
  //     backgroundColor: 'chocolate',
  //
  // },
  // title2: {
  //     flex: 1,
  //     backgroundColor: 'green',
  //
  //
  // },
  // stackCardsScroll: {
  //     flex: 1,
  //     backgroundColor: 'black',
  //
  // }
});

// const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?";
