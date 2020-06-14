import * as React from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import {
  Text,
  Avatar,
  Button,
  Card,
  Badge,
  Divider,
} from "react-native-elements";
import { GetUser, apiService } from "../utils/api";
import { IUser, IActivity } from "../utils/types";
import { getSums } from "../utils/Functions";
import { ScrollView } from "react-native-gesture-handler";
import ActivityCard from "../components/ActivityCard";
import AuthLoading from "./AuthLoading";

export const MemberProfile = ({ navigation, route }: any) => {
  const [user, setUser] = React.useState<IUser>();
  const [activities, setActivities] = React.useState<IActivity[]>([]);
  const [runs, setRuns] = React.useState<IActivity[]>([]);
  const [walks, setWalks] = React.useState<IActivity[]>([]);
  const [bikes, setBikes] = React.useState<IActivity[]>([]);
  const [swims, setSwims] = React.useState<IActivity[]>([]);
  const [sums, setSums] = React.useState<any>({});
  const [userid, setUserid] = React.useState<number>(0);
  const [doesFollow, setdoesFollow] = React.useState<boolean>(false);

  const toggleFollow = async () => {
    if (doesFollow) {
      let removed = await apiService(`/api/members/unfollowUser`, "DELETE", {
        userid,
        following_userid: memberid,
      });
      setdoesFollow(false);
    } else {
      let added = await apiService(`/api/members/followUser`, "POST", {
        userid,
        following_userid: memberid,
      });
      setdoesFollow(true);
    }
  };

  const memberid = route.params.id;

  const pageInfo = async () => {
    let { userid } = await GetUser();
    setUserid(userid);
    try {
      let user = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/members/user_details/${memberid}`
      );
      setUser(user[0]);
    } catch (err) {
      console.log(err);
    }
    try {
      let activities = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/activities/user/${memberid}`
      );
      setActivities(activities);
      let runs = activities.filter(
        (activity: IActivity) => activity.type === "Run"
      );
      let walks = activities.filter(
        (activity: IActivity) => activity.type === "Walk"
      );
      let bikes = activities.filter(
        (activity: IActivity) => activity.type === "Bike"
      );
      let swims = activities.filter(
        (activity: IActivity) => activity.type === "Swim"
      );
      setRuns(runs);
      setWalks(walks);
      setBikes(bikes);
      setSwims(swims);

      let sums: any = getSums(activities, runs, walks, bikes, swims);
      setSums(sums);

      let followers = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/members/following/${userid}`
      );
      let follows = followers.some((item: any) => memberid == item.id);

      if (follows) {
        setdoesFollow(true);
      } else {
        setdoesFollow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Feed",
      headerBackColor: "#FF7600",
    });
    pageInfo();
  }, []);

  return (
    <>
      {user ? (
        <ScrollView style={{ flex: 1 }}>
          {user ? (
            <View style={{ padding: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Avatar
                  rounded
                  title={`${user?.firstname[0]}${user?.lastname[0]}`}
                  size="large"
                  overlayContainerStyle={{ backgroundColor: "#ff7600" }}
                />
                <View style={{ marginHorizontal: 20 }}>
                  <Text h4 style={{ color: "black" }}>
                    {user?.firstname} {user?.lastname}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginTop: 10,
                    }}
                  >
                    <Text>Activities</Text>
                    <Badge status="primary" value={user?.activities} />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text>Followers</Text>
                    <Badge status="success" value={user.followers} />
                  </View>
                </View>
                <Button
                  onPress={toggleFollow}
                  title={doesFollow ? "Unfollow" : "Follow"}
                  titleStyle={{ color: "#FF7600" }}
                  buttonStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#FF7600",
                    borderWidth: 1,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                    backgroundColor: "#ff7600",
                    width: 150,
                    height: 150,
                  }}
                >
                  <Text h1 style={{ color: "white" }}>
                    {activities.length}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderBottomWidth: 2,
                      borderBottomColor: "#ff7600",
                    }}
                  >
                    <Text>Runs</Text>
                    <Text>Walks</Text>
                    <Text>Bikes</Text>
                    <Text>Swims</Text>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View
                      style={{
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 100,
                        backgroundColor: "green",
                        width: 50,
                        height: 50,
                      }}
                    >
                      <Text h4 style={{ color: "white" }}>
                        {runs.length}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 100,
                        backgroundColor: "red",
                        width: 50,
                        height: 50,
                      }}
                    >
                      <Text h4 style={{ color: "white" }}>
                        {walks.length}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 100,
                        backgroundColor: "purple",
                        width: 50,
                        height: 50,
                      }}
                    >
                      <Text h4 style={{ color: "white" }}>
                        {bikes.length}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 100,
                        backgroundColor: "blue",
                        width: 50,
                        height: 50,
                      }}
                    >
                      <Text h4 style={{ color: "white" }}>
                        {swims.length}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  alignSelf: "center",
                  width: "75%",
                }}
              >
                <Text style={{ alignSelf: "center", marginBottom: 10 }} h3>
                  Mileage
                </Text>
                <Text style={{ fontSize: 25, marginVertical: 10 }}>
                  Running | {sums.rs}
                </Text>
                <Text style={{ fontSize: 25, marginVertical: 10 }}>
                  Walking | {sums.ws}
                </Text>
                <Text style={{ fontSize: 25, marginVertical: 10 }}>
                  Biking | {sums.bs}
                </Text>
                <Text style={{ fontSize: 25, marginVertical: 10 }}>
                  Swimming | {sums.ss}
                </Text>
              </View>
              <Divider style={{ marginVertical: 10 }} />
            </View>
          ) : (
            <View>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
            </View>
          )}
          <ScrollView>
            <Text style={{ textAlign: "center" }} h3>
              Activities
            </Text>
            {activities.map((activity) => (
              <ActivityCard
                activity={activity}
                navigation={navigation}
                key={activity.id}
              />
            ))}
          </ScrollView>
        </ScrollView>
      ) : (
        <AuthLoading />
      )}
    </>
  );
};

export default MemberProfile;
