import * as React from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Text } from "react-native-elements";

export const Settings = (props: any) => {
  const logout = async () => {
    try {
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
    props.setter(false);
    // props.navigation.navigate("Login");
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackTitle: "Feed",
      headerBackStyle: { color: "#white" },
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }} h3>
        Settings
      </Text>
      <Button
        title="Log Out"
        buttonStyle={{ backgroundColor: "tomato" }}
        onPress={logout}
      />
    </View>
  );
};

export default Settings;
