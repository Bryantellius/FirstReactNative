import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, BaseRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Single from "./screens/Single";
import { GetAccessToken } from "./utils/api";
import AuthLoading from "./screens/AuthLoading";

const Stack = createStackNavigator();
const image = require("./assets/icon.png");

export const App = () => {
  const [signedIn, setSignedIn] = React.useState<boolean>(false);
  const accessToken = async () => {
    try {
      let token = await GetAccessToken();
      if (token) {
        setSignedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    accessToken();
  }, []);
  return (
    <NavigationContainer>
      {signedIn ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: "Strider",
            headerTintColor: "black",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Single" component={Single} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Loading" component={AuthLoading}></Stack.Screen>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
