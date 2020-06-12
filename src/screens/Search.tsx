import * as React from "react";
import { View } from "react-native";
import { SearchBar, Text, Button } from "react-native-elements";

export const Search = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Feed",
      headerBackStyle: { color: "white" },
    });
  });

  return (
    <View>
      <SearchBar placeholder="Search..." />
      <Text h1>Search Page!</Text>
    </View>
  );
};

export default Search;
