import "react-native-gesture-handler";
import * as React from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Single from "./screens/Single";
import { GetAccessToken, GetUser } from "./utils/api";
import MemberProfile from "./screens/MemberProfile";
import Search from "./screens/Search";
import Settings from "./screens/Settings";

const AppStack = createStackNavigator();

export const App = () => {
  const [signedIn, setSignedIn] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<number>(0);

  const _getAccessToken = async () => {
    try {
      let token = await GetAccessToken();
      if (token) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
    let { userid } = await GetUser();
    if (userid === null) {
      setSignedIn(false);
    } else {
      setCurrentUser(userid);
    }
  };

  React.useLayoutEffect(() => {
    _getAccessToken();
  }, [signedIn]);

  return (
    <NavigationContainer>
      <AppStack.Navigator
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
        {signedIn ? (
          <>
            <AppStack.Screen name="Home">
              {(props) => <Home userid={currentUser} {...props} />}
            </AppStack.Screen>
            <AppStack.Screen name="Single" component={Single} />
            <AppStack.Screen name="Member" component={MemberProfile} />
            <AppStack.Screen name="Search">
              {(props) => <Search userid={currentUser} {...props} />}
            </AppStack.Screen>
            <AppStack.Screen name="Settings">
              {(props) => (
                <Settings signin={signedIn} setter={setSignedIn} {...props} />
              )}
            </AppStack.Screen>
          </>
        ) : (
          <AppStack.Screen
            name="Login"
            options={{
              headerRight: ({ navigation, route }: any) => (
                <Ionicon
                  name="ios-add"
                  size={30}
                  color="white"
                  style={{ marginHorizontal: 15 }}
                  onPress={() => navigation.navigate("Signup")}
                />
              ),
            }}
          >
            {(props) => (
              <Login signin={signedIn} setter={setSignedIn} {...props} />
            )}
          </AppStack.Screen>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
