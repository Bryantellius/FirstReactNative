import * as React from "react";
import { View, Alert } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { apiService } from "../utils/api";
import { styles } from "../utils/styles";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async () => {
    try {
      let res = await apiService(
        "https://still-taiga-99815.herokuapp.com/auth/login",
        "POST",
        { email, password }
      );
      console.log(res);
    } catch (err) {
      Alert.alert("There was a problem loggin in..");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginView}>
        <Input
          style={styles.input}
          leftIcon={{ type: "ionicon", name: "ios-mail" }}
          textContentType="emailAddress"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={styles.input}
          leftIcon={{ type: "ionicon", name: "ios-key" }}
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Login"
          containerStyle={{ margin: 20 }}
          buttonStyle={{ backgroundColor: "#ff7600" }}
          onPress={() => handleLogin()}
          raised
        />
      </View>
    </View>
  );
};

export default Login;
