import { useState, useCallback } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, TextInput } from "react-native"
import { getRealm } from "../../database/realm"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";


export default function Key() {

    const navigation = useNavigation();

    const [key, setKey] = useState("");
    const [inputValue, setInputValue] = useState("")

    async function verifyKey() {
        const realm = await getRealm()

        try {
            const response = realm.objectForPrimaryKey("User", "User01")
            //@ts-ignore
            if (response !== null) {
                //@ts-ignore
                setKey(response!.key)
            }

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }

        // try {
        //     realm.write(() => {
        //         const objectToDelete = realm.objectForPrimaryKey("User", "User01");
        //         realm.delete(objectToDelete);
        //     });
        //     navigation.goBack()
        // } catch (e) {
        //     console.log(e)
        // } finally {
        //     realm.close
        // }
    }

    async function handleNewKey() {
        if (inputValue === "") {
            return;
        }
        const realm = await getRealm();

        try {
            realm.write(() => {
                const user = realm.objectForPrimaryKey("User", "User01");
                if (user) {
                    //@ts-ignore
                    user.key = inputValue;
                } else {
                    realm.create("User", {
                        _id: "User01",
                        key: inputValue,
                        created_at: new Date().toString(),
                    });
                }
            });

            setKey(inputValue);
            setInputValue("");
            verifyKey();
        } catch (e) {
            console.log(e);
        } finally {
            realm.close;
        }
    }


    useFocusEffect(useCallback(() => {
        verifyKey()
    }, []))

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.buttonKey}
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name='chevron-left'
                        color={"#fff"}
                        size={40}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Chat Cesusc</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Cadastre uma nova chave</Text>
                <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                    placeholder="Digite a chave"
                />
                <TouchableOpacity style={styles.buttonSave} onPress={handleNewKey}>
                    <Text style={styles.text} >Salvar</Text>
                </TouchableOpacity>
                <Text style={{color: "#fff3"}}>Chave cadastrada</Text>
                <Text style={styles.text}>{key || "Nenhuma chave encontrada"}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        gap: 10,
        backgroundColor: "#1d1d2e",
        alignItems: "center",
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        width: "80%",
        color: "#fff",
        borderColor: "#444",
        backgroundColor: "#414141",
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 7,
        paddingLeft: 12,
        fontSize: 14,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
    buttonSave: {
        backgroundColor: "#2757cf",
        padding: 10,
        alignSelf: "flex-end",
        marginRight: "10%",
        borderRadius: 10,
    },
    buttonKey: {
        backgroundColor: "transparent",
        marginLeft: 30
    },
    title: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 40,
        marginLeft: "20%",
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
    },


})