import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../utils/styles";

export const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page!</Text>
    </View>
  );
};

export default Profile;
