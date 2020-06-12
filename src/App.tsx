import "react-native-gesture-handler";
import * as React from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Single from "./screens/Single";
import { GetAccessToken } from "./utils/api";
import AuthLoading from "./screens/AuthLoading";
import MemberProfile from "./screens/MemberProfile";
import Search from "./screens/Search";

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
      {signedIn ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation, route }) => ({
            headerTitle: "Strider",
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "900", fontSize: 25 },
            headerStyle: { backgroundColor: "#FF7600" },
            headerRight: () => (
              <Ionicon
                name="ios-search"
                size={30}
                color="white"
                style={{ marginHorizontal: 15 }}
                onPress={() => navigation.navigate("Search")}
              />
            ),
          })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="Member" component={MemberProfile} />
          <Stack.Screen name="Search" component={Search} />
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
