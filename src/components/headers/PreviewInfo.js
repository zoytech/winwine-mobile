import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import {StyleSheet, View} from "react-native";
import useTextStyle from "../content/textStyle";
import TextItem from "../content/TextItem";

export default function PreviewInfo(props) {
    const textStyle = useTextStyle;
    const {
        typography = Typography.label.medium,
        colorText = ColorVariant.surface,
        style,
        children,
    } = props;
    const {
        id: id, title: name, tag: label,
    } = CardInformation;


    const {onBase} = Color.light[colorText];
    const containerStyle = [styles.container];
    const contentStyle = [typography, onBase];

    return (
        <View style={containerStyle}>
            {name &&
                <TextItem
                    content={name}
                    contentStyle={contentStyle}
                />
            }
            {label &&
                <TextItem
                    content={label}
                    contentStyle={contentStyle}
                />
            }
        </View>)

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'flex-start',
        padding: 7,
        // backgroundColor: "#f0f8ff",

        height: '100%',
        width: '100%',
    },
});

const CardInformation = {
    id: '123', title: 'Bai cua Nam', tag: 'Thieu nhi', totalCards: '30', avatar: 'N'
}

