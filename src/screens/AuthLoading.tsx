import * as React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";

export const AuthLoading = () => {
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoading;
