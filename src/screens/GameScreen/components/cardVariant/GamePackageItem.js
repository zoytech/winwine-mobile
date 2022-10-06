// import {View} from 'react-native';
// import {Color, ColorVariant, Typography} from '../../../../themes';
// import cardItemLayout from './cardItemLayout';
// import {Action, Headline, Media} from '../cardComponents';
// import {SubTitle, Title} from '../cardComponents/Headline';
// import {PrimaryChip, SecondaryChip} from '../../../../components/chips';
// import {ElevatedButton} from '../../../../components';
//
// export default function GamePackageItem(props) {
//   const {
//     typoSubTitle = Typography.label.medium,
//     typoButton = Typography.label.small,
//     colorSurface = ColorVariant.surface,
//     colorOutline = ColorVariant.outline,
//   } = props;
//   const {container, headline, action, media} = cardItemLayout.packageItem;
//   const {base} = Color.light[colorSurface];
//   const {base: outlineColor} = Color.light[colorOutline];
//
//   const containerStyle = [
//     container,
//     {backgroundColor: base, borderColor: outlineColor, elevation: 10},
//   ];
//   const handlePressFilledButton = () => {
//     alert('move to new card');
//   };
//   const {title, tag, id} = cardInfo;
//
//   return (
//     <View style={containerStyle}>
//       <Media
//         style={media}
//         source={require('../../../../assets/images/preview-package/member1.jpg')}
//       />
//       <Headline style={headline}>
//         <Title content={title} contentStyle={typoButton} />
//         <SubTitle contentLeft={tag} contentStyle={typoSubTitle} />
//       </Headline>
//       <Action style={action}>
//         <SecondaryChip
//           content={'play now'}
//           contentStyle={typoButton}
//           onPress={handlePressFilledButton}
//           // dragged="true"
//           // disabled="true"
//         />
//       </Action>
//     </View>
//   );
// }
//
// const cardInfo = {
//   id: '123',
//   title: 'Bai cua Nam',
//   tag: 'Thieu nhi',
//   totalCards: '30',
//   avatar: 'N',
//   currentCard: '28',
// };
