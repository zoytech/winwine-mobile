import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import {StyleSheet, Text, View} from "react-native";
import AvatarDefault from "../icons/AvatarDefault";

export default function HeadlineInfo(props) {
    const {
        headerTypo = Typography.title.medium,
        tagNameTypo = Typography.body.medium,
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
    const containerStyle = [styles.container, {backgroundColor: base}];
    const avatarStyle = [styles.avatar];
    const informationStyle = [styles.information];
    const headerStyle = [styles.header];
    const subHeaderStyle = [styles.subHeader];
    const textHeaderStyle = [headerTypo];
    const textSubHeaderStyle = [tagNameTypo];


    return (
        <View style={containerStyle}>
            <View style={avatarStyle}>
                <AvatarDefault
                    content={avatar}
                    colorVariantText={ColorVariant.surface}
                    colorVariantBackground={ColorVariant.primary}
                />
            </View>
            <View style={informationStyle}>
                <View style={headerStyle}>
                    {name && <Text style={textHeaderStyle}>{name}</Text>}
                </View>
                <View style={subHeaderStyle}>
                    {label && <Text style={textSubHeaderStyle}>{label}</Text>}
                    {total && <Text style={textSubHeaderStyle}>{`Tổng số ${total} lá`}</Text>}
                </View>
            </View>

        </View>)

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 28,
        paddingVertical: 11,

        width: 360,
        height: 82,
        backgroundColor: "#f0f8ff",
    }, avatar: {
        flex: 1, alignSelf: "center"


    }, information: {
        flex: 4,
        display: "flex", flexDirection: "column"

    }, header: {
        flex: 1,

    }, subHeader: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

const CardInformation = {
    id: '123', title: 'Bai cua Nam', tag: 'Thieu nhi', totalCards: '30', avatar: 'N'
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
