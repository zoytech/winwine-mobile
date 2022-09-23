// const CardSizeVariant = {
//     game: 'game',
//     preview: 'preview',
//     end: 'end',
// };
//

const useCardStyle = {
    gameCard: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",

            width: 274,
            height: 450,
            borderRadius: 12,
            overflow: "hidden",

            //ratio: 1.64 width, height of card
        },
        headline: {
            flex: 3,
        },

        content: {
            flex: 5,
            justifyContent: "center",
            backgroundColor: 'cyan',
            paddingHorizontal: 20,
        },

        button: {
            flex: 1,

            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            alignItems: "center",

            width: "100%",
            padding: 0,

        },
    },
    previewCard: {}
}

export default useCardStyle;
