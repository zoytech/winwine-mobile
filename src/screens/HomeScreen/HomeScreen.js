import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {SurfacesVariant} from '../../themes/surfaces';
import SurfaceItem from '../../components/elevations/ElevationVariant';

export default function HomeScreen(props) {
  const screenStyle = [
    styles.container,
    {backgroundColor: 'rgba(52, 52, 52, 0.2)'},
  ];
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
      <SurfaceItem surfaceVariant={SurfacesVariant.surface5} />
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
    margin: 30, // shadowColor: '#000',
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
