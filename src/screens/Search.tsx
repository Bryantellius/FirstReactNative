import * as React from "react";
import { View } from "react-native";
import { SearchBar, Text, Button } from "react-native-elements";
import { IUser } from "../utils/types";
import { apiService } from "../utils/api";

export const Search = ({ navigation }: any) => {
  const [searchItem, setSearchItem] = React.useState<string>("");
  const [users, setUsers] = React.useState<IUser[]>([]);

  const _getUsers = async () => {
    try {
      let users = await apiService(
        "https://still-taiga-99815.herokuapp.com/api/members/all"
      );
      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Feed",
      headerBackStyle: { color: "white" },
    });
    _getUsers();
  }, [users]);

  const updateSearch = (search: string) => {
    setSearchItem(search);
    let searchedUsers = users.filter(
      (user: IUser) =>
        (user.firstname + " " + user.lastname).indexOf(search) !== -1
    );
    setUsers(searchedUsers);
  };

  return (
    <View>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        value={searchItem}
        round
        lightTheme
      />
      <Text h1>Search Page!</Text>
    </View>
  );
};

export default Search;
