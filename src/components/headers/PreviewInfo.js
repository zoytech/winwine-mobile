// import {Color, Typography} from "../../themes";
// import {ColorVariant} from "../../themes/color";
// import {StyleSheet, View} from "react-native";
// import TextItem from "../content/TextItem";
//
// export default function PreviewInfo(props) {
//     const {
//
//         style,
//         children,
//     } = props;
//     const {
//         id: id, title: name, tag: label,
//     } = CardInformation;
//
//
//     const {onBase} = Color.light[colorText];
//     const containerStyle = [styles.container, style];
//     const headerTextStyle = [typography, onBase];
//
//     return (
//         <View style={containerStyle}>
//             {/*{name &&*/}
//             {/*    <TextItem*/}
//             {/*        content={name}*/}
//             {/*        contentStyle={contentStyle}*/}
//             {/*    />*/}
//             {/*}*/}
//             {/*{label &&*/}
//             {/*    <TextItem*/}
//             {/*        content={label}*/}
//             {/*        contentStyle={contentStyle}*/}
//             {/*    />*/}
//             {/*}*/}
//         </View>)
//
// }
//
// const styles = StyleSheet.create({
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: 'flex-start',
//         padding: 7,
//         // backgroundColor: "#f0f8ff",
//
//         height: '100%',
//         width: '100%',
//     },
// });

const CardInformation = {
    id: '123', title: 'Bai cua Nam', tag: 'Thieu nhi', totalCards: '30', avatar: 'N'
}

import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import {StyleSheet, View} from "react-native";
import useTextStyle from "../content/textStyle";
import TextItem from "../content/TextItem";
import useHeadlineStyle from "./headlineStyle";

export default function HeadlineInfo(props) {
    const textStyle = useTextStyle;
    const headlineStyle = useHeadlineStyle;
    const {
        typography = Typography.label.medium,
        colorText = ColorVariant.surface,
        info,
        styleContent,
        style,
        children,
    } = props;
    const {
        id: id, title: name, tag: label, totalCards: total, avatar: avatar
    } = CardInformation;


    const {base, onBase} = Color.light[colorText];
    const contentBlockStyle = [headlineStyle.contentBlockStyle, style];
    const headerStyle = [headlineStyle.header];
    const subHeaderStyle = [headlineStyle.subHeader];
    const textContentStyle = [typography, textStyle.text, {color: onBase}];


    return (
        <View style={contentBlockStyle}>
            {name &&
                <TextItem
                    content={name}
                    contentStyle={textContentStyle}
                    containerStyle={headerStyle}
                />
            }
            <View style={subHeaderStyle}>
                {label &&
                    <TextItem
                        content={label}
                        contentStyle={textContentStyle}
                    />
                }
            </View>
        </View>
    )
}


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


