import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import {StyleSheet, Text, View} from "react-native";
import AvatarDefault from "../icons/AvatarDefault";

export default function PreviewInfo(props) {
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
    const headerStyle = [styles.header];
    const subHeaderStyle = [styles.subHeader];
    const textHeaderStyle = [typography, onBase];
    const textSubHeaderStyle = [typography, onBase];

    return (
        <View style={containerStyle}>
            <View style={headerStyle}>
                {name && <Text style={textHeaderStyle}>{name}</Text>}
            </View>
            <View style={subHeaderStyle}>
                {label && <Text style={textSubHeaderStyle}>{label}</Text>}
            </View>
        </View>)

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",

        backgroundColor: "#f0f8ff",

        height: 50,
        width: 147,
    }, header: {
        flex: 1, backgroundColor: "#ff7f50", fontWeight: "bold",

    }, subHeader: {
        flex: 1, fontWeight: "normal",
    }
});

const CardInformation = {
    id: '123', title: 'Bai cua Nam', tag: 'Thieu nhi', totalCards: '30', avatar: 'N'
}

