import { View, ActivityIndicator } from "react-native"

import AppRoutes from "./app.routes"

function Routes(){
    const loading = false

    if(loading){
        return(
            <View 
                style={{ flex:1,
                    backgroundColor: "#1D1D2E", 
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <ActivityIndicator size={60} color="crimson"/>
            </View>
        )
    }

    return(
        <AppRoutes />
    )
}

export default Routes