import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../screens/Home"
import Chat from "../screens/Chat"

const Stack = createNativeStackNavigator()

function AppRoutes() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
            </Stack.Navigator>
    )
}

export default AppRoutes