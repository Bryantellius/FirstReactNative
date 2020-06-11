import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { GetAccessToken } from "./utils/api";

const Stack = createStackNavigator();

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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: "Strider",
        }}
      >
        {signedIn ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
