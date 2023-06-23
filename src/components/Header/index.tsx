import { useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Animated, Easing, TextInput } from 'react-native';

import Icon from "react-native-vector-icons/Feather"

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRealm } from '../../database/realm';
import { useNavigation } from '@react-navigation/native';

export type MessagesProps = {
    _id: string,
    from: number,
    to: number,
    createdAt: string,
    message: string,
}

export type ChatProps = {
    _id: string;
    title: string;
    messages: MessagesProps[];
    createdAt: string,
}
type Props = {
    data: ChatProps;
}


export function Header({ data }: Props) {

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState(data.title);
    const scale = useRef(new Animated.Value(0)).current

    const options = [
        {
            title: "Excluir",
            color: "red",
            action: () => handleDeleteChat()
        }
    ]

    function resizeBox(to: number) {
        to === 1 && setVisible(true)
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear
        }).start(() => to === 0 && setVisible(false))
    }

    async function handleDeleteChat() {
        const realm = await getRealm()

        try {
            realm.write(() => {
                const objectToDelete = realm.objectForPrimaryKey("Chat", data._id);
                realm.delete(objectToDelete);
            });
            navigation.goBack()
        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    async function updateChatTitle(chatId: string, newTitle: string) {
        const realm = await getRealm();

        try {
            realm.write(() => {
                const chat = realm.objectForPrimaryKey<ChatProps>("Chat", chatId);
                chat!.title = newTitle;
            });
        } catch (error) {
            console.log("Erro ao atualizar o título do chat:", error);
        }
    }

    function handleInputChange(text: string) {
        setTitle(text);
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    name='chevron-left'
                    color={"#fff"}
                    size={40}
                />
            </TouchableOpacity>

            <View style={styles.content}>
                <TextInput
                    style={styles.title}
                    value={title}
                    onChangeText={handleInputChange}
                    onSubmitEditing={() => updateChatTitle(data._id, title)}
                />

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => resizeBox(1)}
            >
                <Icon
                    name='more-vertical'
                    color={"#fff"}
                    size={20}
                />
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <SafeAreaView
                    style={{ flex: 1 }}
                    onTouchStart={() => resizeBox(0)}
                >
                    <Animated.View
                        style={[
                            styles.popup,
                            { opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) },
                            {
                                transform: [{ scale }],
                            },
                        ]}
                    >
                        {options.map((op, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[styles.option, { borderBottomWidth: i === options.length - 1 ? 0 : 1 }]}
                                onPress={op.action}
                            >
                                <Text style={{ color: op.color }}>{op.title}</Text>
                            </TouchableOpacity>
                        ))

                        }
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: '#1B1B2A',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 8,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
    },
    title: {
        fontSize: 20,
        lineHeight: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        height: 80,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        flex: 1,
        borderRadius: 8,
        borderColor: "#333",
        padding: 10,
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "white",
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 7,
        borderBottomColor: "#ccc",
    }
});