import * as React from "react";
import { View } from "react-native";
import { SearchBar, Text, Button, ListItem } from "react-native-elements";
import { IUser } from "../utils/types";
import { apiService } from "../utils/api";

export const Search = ({ navigation }: any) => {
  const [searchItem, setSearchItem] = React.useState<string>("");
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>([]);

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
    setFilteredUsers(searchedUsers);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        value={searchItem}
        round
        lightTheme
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {filteredUsers.map((user: IUser) => {
          return (
            <ListItem
              key={user.id}
              title={`${user.firstname} ${user.lastname}`}
              bottomDivider
              chevron
            />
          );
        })}
      </View>
    </View>
  );
};

export default Search;
