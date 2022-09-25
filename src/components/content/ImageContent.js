import {Image, StyleSheet, View} from "react-native";

export default function ImageContent(props) {
    const {
        containerStyle,
        imageStyle,
    } = props;
    const container = [styles.container, containerStyle]
    const image = [styles.image, imageStyle]
    return (
        <View style={container}>
            <Image
                style={image}
                source={require('../../assets/images/preview-package/member1.jpg')}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: 'nowrap',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    image: {
        // resizeMode: 'contain',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: 1,
    }
})
