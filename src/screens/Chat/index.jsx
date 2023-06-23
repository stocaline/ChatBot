import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, FlatList } from "react-native"
import { useEffect, useRef, useState, createRef, createElement, Fragment } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather"
import uuid from "react-native-uuid";
import { Header } from "../../components/Header";
import { getRealm } from "../../database/realm";
import { isEmpty, toString } from "lodash";
import { ChatBot } from "../../utils/Bot";
import { api } from "../../services/api";
import LottieView from "lottie-react-native"

import MarkdownRenderer from '../../components/Markdown';

const { width } = Dimensions.get("window")

export default function Chat({ route }) {

    let animation = createRef()
    const { chat } = route.params
    const flatListRef = useRef(null);

    const [listMsg, setListMsg] = useState(chat.messages);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);


    function loadingContent(bolean) {
        setLoading(bolean)
        if (bolean) {
            animation.current.play()
        }
    }

    function getDate() {
        const now = new Date();
        const options = { timeZone: 'America/Sao_Paulo' };
        const formattedDate = now.toLocaleString('pt-BR', options);
        return formattedDate
    }

    async function saveMsg(newMessage) {
        const realm = await getRealm();

        try {
            realm.write(() => {
                chat.messages.push(newMessage);
            });

        } catch (error) {
            console.log("Message error:", error);
        }
    }

    async function handleSendMessage() {
        if (inputText == "") {
            return
        }
        setInputText("")

        const newMessage = {
            _id: toString(uuid.v4()),
            from: 2,
            to: 1,
            path: "",
            message: inputText,
            created_at: getDate(),
        }

        saveMsg(newMessage)
        getResponseFromBot(newMessage.message)
    }

    async function startChatBotMsg() {
        if (isEmpty(chat.messages)) {
            saveMsg(new ChatBot().startMessage(),)
        }
    }

    async function getResponseFromBot(messagebot) {
        loadingContent(true)

        //const messageBot = new ChatBot().verify(message)
        try {
            var obj = {
                "prefixo": "8496",
                "nomeContato": "Ibsem",
                "mensagem": `${messagebot}`
            }
            const response = await api.post('/processaPedido/', obj, { headers: { "Authorization": "1096385449351712768-3165192b8c53c612be0bdae62ecbf9d0f968c502b9a03f67c87a62d72214be4c" } })
            const message = JSON.parse(response.data).respostaBOT
            const newMessage = {
                _id: toString(uuid.v4()),
                from: 1,
                to: 2,
                path: "",
                message: message,
                created_at: getDate(),
            }
            saveMsg(newMessage)

        } catch (err) {
            saveMsg(new ChatBot().unknownMessage())
        } finally {
            loadingContent(false)
        }
    }

    useEffect(() => {
        startChatBotMsg()

    }, [listMsg]);

    function renderMsg(item) {

        if (item.from == 1) {
            return (
                <View style={styles.forMe}>
                    <MarkdownRenderer markdownContent={item.message} />
                    <Text style={styles.hour}>{item.created_at.substr(11, 5)}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.fromMe}>
                    <MarkdownRenderer markdownContent={item.message} />
                    <Text style={styles.hour}>{item.created_at.substr(11, 5)}</Text>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header data={chat} />
            <View style={styles.content}>
                <FlatList
                    data={listMsg}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => renderMsg(item)}
                    ref={flatListRef}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true, duration: 500 })}
                />
            </View>

            <KeyboardAvoidingView
                behavior="padding"
                enabled={Platform.OS == "ios"}
                style={styles.footer}
            >
                <View style={loading ? { display: "flex" } : { display: "none" }}>
                    <LottieView
                        source={require("../../assets/loader.json")}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        loop={true}
                        ref={animation}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
                >

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem"
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleSendMessage}
                    >
                        <Icon
                            name='send'
                            color={"#fff"}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1d1d2e",
        flex: 1,
    },

    content: {
        backgroundColor: "#1d1d2e",
        flex: 1,
    },

    footer: {
        marginBottom: 10,
        borderTopColor: "#444",
        borderTopWidth: 1,
    },
    input: {
        height: 40,
        color: "#fff",
        borderColor: "#444",
        backgroundColor: "#414141",
        borderWidth: 1,
        borderRadius: 40,
        marginHorizontal: 20,
        marginVertical: 7,
        paddingLeft: 12,
        flex: 1,
        fontSize: 14,
    },
    forMe: {
        alignSelf: 'flex-start',
        backgroundColor: "#008cff",
        padding: 10,
        marginVertical: 10,
        maxWidth: width * 0.8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginLeft: 20,
    },
    fromMe: {
        alignSelf: 'flex-end',
        marginRight: 10,
        backgroundColor: "#508bbb",
        padding: 10,
        marginVertical: 10,
        maxWidth: width * 0.8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        marginLeft: width * 0.2 - 20,
    },
    msgTxt: {
        fontSize: 16,
        color: '#ffffff',
    },
    hour: {
        fontSize: 11,
        color: "#1d1d2e",
        textAlign: "right"
    }
});