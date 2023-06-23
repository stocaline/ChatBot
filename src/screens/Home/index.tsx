import { useState, useCallback } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList, TouchableWithoutFeedback } from "react-native"
import { Card, ChatProps } from "../../components/Card";
import uuid from "react-native-uuid"
import { getRealm } from "../../database/realm"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { toString } from "lodash";


export default function Home() {
    
    const navigation = useNavigation();
    
    const [data, setData] = useState<ChatProps[]>();
    
    async function handleFetchData() {
        const realm = await getRealm()
    
        try {
            const response = realm.objects("Chat")
            setData(response)
    
        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    
    }
    
    async function handleNewChat() {
        const realm = await getRealm()
        
        try {
            realm.write(() => {
                realm.create("Chat", {
                    _id: uuid.v4(),
                    title: "Novo Chat",
                    messages: [],
                    created_at: toString(new Date()),
                })
            })

            handleFetchData();
        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    async function handleOpenChat(chat: ChatProps) {
        navigation.navigate("Chat", { chat: chat });
    }

    useFocusEffect(useCallback(() => {
        handleFetchData();
    }, []))


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Chat Cesusc</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={item => item._id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback
                        onPress={() => handleOpenChat(item)}>
                        <View>
                            <Card
                                data={item}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                }
            />


            <TouchableOpacity style={styles.buttonAdd} onPress={handleNewChat}>
                <Text style={styles.buttonAddText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#1d1d2e"
    },

    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        marginTop: 30,
        marginBottom: 40,
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
    },

    listHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    listCount: {
        color: '#888D97',
        fontSize: 13
    },
    list: {
        flex: 1,
        width: '100%'
    },
    listContent: {
        padding: 24,
        paddingBottom: 150
    },

    buttonAdd: {
        width: 70,
        height: 70,
        padding: 10,
        position: "absolute",
        right: 30,
        bottom: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0084ff",
        borderRadius: 100
    },
    buttonAddText: {
        color: "#fff",
        fontSize: 30,
    },

})