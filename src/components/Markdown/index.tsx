import { Text, StyleSheet, Linking } from 'react-native';

const MarkdownRenderer = ({ markdownContent }: any) => {

    function boldStyle(text: string) {
        const regex = /\*(.*?)\*/g;
        let match;
        let lastIndex = 0;
        const formattedText = [];

        while ((match = regex.exec(text))) {
            const startIndex = match.index;
            const endIndex = regex.lastIndex - 1;

            // Texto antes do trecho em negrito
            const normalText = text.substring(lastIndex, startIndex);
            formattedText.push(
                italicStyle(normalText)
            );

            // Trecho em negrito
            const boldText = text.substring(startIndex + 1, endIndex);
            formattedText.push(
                <Text key={formattedText.length} style={{ fontWeight: 'bold', color: "#fff" }}>
                    {boldText}
                </Text>
            );

            lastIndex = regex.lastIndex;
        }

        // Texto após o último trecho em negrito
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
            formattedText.push(
                italicStyle(remainingText)
            );
        }
        return <Text>{formattedText}</Text>;
    }

    function italicStyle(text: string) {
        const regex = /\_(.*?)\_/g;
        let match;
        let lastIndex = 0;
        const formattedText = [];

        while ((match = regex.exec(text))) {
            const startIndex = match.index;
            const endIndex = regex.lastIndex - 1;

            // Texto antes do trecho em negrito
            const normalText = text.substring(lastIndex, startIndex);
            formattedText.push(
                LinkStyle(normalText)
            );

            // Trecho em italico
            const italicText = text.substring(startIndex + 1, endIndex);
            formattedText.push(
                <Text key={formattedText.length} style={{ fontStyle: 'italic', color: "#fff" }}>
                    {italicText}
                </Text>
            );

            lastIndex = regex.lastIndex;
        }

        // Texto após o último trecho em negrito
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
            formattedText.push(
                LinkStyle(remainingText)
            );
        }
        return <Text>{formattedText}</Text>;
    }

    function italicAndBoldStyle(text: string) {
        const regex = /_\*(.*?)\*_/g;
        let match;
        let lastIndex = 0;
        const formattedText = [];

        while ((match = regex.exec(text))) {
            const startIndex = match.index;
            const endIndex = regex.lastIndex - 2;

            // Texto antes do trecho formatado
            const normalText = text.substring(lastIndex, startIndex);
            formattedText.push(
                boldStyle(normalText)
            );

            // Trecho formatado (negrito e itálico)
            const formattedContent = text.substring(startIndex + 2, endIndex);
            formattedText.push(
                <Text key={formattedText.length} style={{ fontWeight: 'bold', fontStyle: 'italic', color: "#fff" }}>
                    {formattedContent}
                </Text>
            );

            lastIndex = regex.lastIndex;
        }

        // Texto após o último trecho formatado
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
            formattedText.push(
                boldStyle(remainingText)
            );
        }

        return <Text>{formattedText}</Text>;
    };

    function LinkStyle(text: string) {
        const regex = /(https?:\/\/\S+)/g;
        let match;
        let lastIndex = 0;
        const formattedText = [];

        while ((match = regex.exec(text))) {
            const startIndex = match.index;
            const endIndex = regex.lastIndex;

            // Texto antes do link
            const normalText = text.substring(lastIndex, startIndex);
            formattedText.push(
                <Text key={formattedText.length} style={{color:"#fff"}}>
                    {normalText}
                </Text>
            );

            // Link clicável
            const linkText = text.substring(startIndex, endIndex);
            formattedText.push(
                <Text key={formattedText.length} style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => handleLinkPress(linkText)}>
                    {linkText}
                </Text>
            );

            lastIndex = endIndex;
        }

        // Texto após o último link
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
            formattedText.push(
                <Text key={formattedText.length} style={{color:"#fff"}}>
                    {remainingText}
                </Text>
            );
        }

        const handleLinkPress = (url: string) => {
            Linking.openURL(url);
        };

        return <Text>{formattedText}</Text>;
    };

    return italicAndBoldStyle(markdownContent)
};



















//     const formattedText = text
//         .replace(/\*(.*?)\*/g, "<B>$1</B>") // Texto em negrito
//         .replace(/_(.*?)_/g, "<I>$1</I>") // Texto em itálico
//         .replace(/_\*(.*?)\*_/g, "<BI>$1</BI>"); // Texto em negrito e itálico

//     return <Text style={styles.msgTxt}>{formattedText}</Text>;
// };

// const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
// const I = (props) => <Text style={{ fontStyle: "italic" }}>{props.children}</Text>
// const BI = (props) => <Text style={{ fontWeight: 'bold', fontStyle: "italic" }}>{props.children}</Text>

// function renderMsg(item) {

//     if (item.from == 1) {
//         return (
//             <View style={styles.forMe}>
//                 <MarkdownRenderer markdownContent={item.message} />
//                 <Text style={styles.hour}>{item.created_at.substr(11, 5)}</Text>
//             </View>
//         )
//     } else {
//         return (
//             <View style={styles.fromMe}>
//                 <MarkdownRenderer markdownContent={item.message} />
//                 <Text style={styles.hour}>{item.created_at.substr(11, 5)}</Text>
//             </View>
//         )
//     }
// }

//                 {/* <Text style={styles.msgTxt}>
//                     {item.message}
//                 </Text> */}

export default MarkdownRenderer;

const styles = StyleSheet.create({
    msgTxt: {
        fontSize: 16,
        color: '#ffffff',
    },
})
