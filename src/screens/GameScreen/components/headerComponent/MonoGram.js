// import {StyleSheet, View} from 'react-native';
// import {TextContent} from '../../../content';
// import {Color, Typography} from '../../../../themes';
// import {ColorVariant} from '../../../../themes/color';
//
// function MonoGram(props) {
//   const {
//     initial,
//     typography = Typography.title.medium,
//     colorVariant = ColorVariant.primary,
//   } = props;
//
//   const {base, onBase} = Color.light[colorVariant];
//   const containerStyle = [styles.shape, {backgroundColor: base}];
//   const textStyle = [styles.text, {color: onBase}, typography];
//   return (
//     <View style={containerStyle}>
//       {initial ? (
//         <TextContent content={initial} contentStyle={textStyle} />
//       ) : (
//         <TextContent content={'?'} contentStyle={textStyle} />
//       )}
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   shape: {
//     width: 30,
//     height: 30,
//     borderRadius: 30 / 2,
//   },
//   text: {
//     textTransform: 'uppercase',
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     height: '100%',
//   },
// });
// export default MonoGram;
