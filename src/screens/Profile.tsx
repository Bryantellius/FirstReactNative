import * as React from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { Text, Avatar, Button, Card, Badge } from "react-native-elements";
import { averagePace } from "../utils/Functions";
import { GetUser, apiService } from "../utils/api";
import { IUser, IActivity } from "../utils/types";
import { ScrollView } from "react-native-gesture-handler";

export const Profile = ({ navigation }: any) => {
  const [user, setUser] = React.useState<IUser>();
  const [activities, setActivities] = React.useState<IActivity[]>([]);

  const pageInfo = async () => {
    let { userid } = await GetUser();
    try {
      let user = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/members/user_details/${userid}`
      );
      setUser(user[0]);
    } catch (err) {
      console.log(err);
    }
    try {
      let activities = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/activities/user/${userid}`
      );
      setActivities(activities);
    } catch (err) {
      console.log(err);
    }
  };

  React.useLayoutEffect(() => {
    pageInfo();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Avatar
              rounded
              title={`${user?.firstname[0]}${user?.lastname[0]}`}
              size="large"
              overlayContainerStyle={{ backgroundColor: "#ff7600" }}
            />
            <View style={{ marginHorizontal: 20 }}>
              <Text h4>
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
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <Text>Followers</Text>
                <Badge status="success" value={user.followers} />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )}
      <ScrollView>
        {activities.map((activity) => (
          <View key={`${activity.id}-${activity.lastname}`}>
            <Card>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Avatar
                  rounded
                  size="small"
                  overlayContainerStyle={{ backgroundColor: "#ff7600" }}
                  title={`${activity.firstname[0]}${activity.lastname[0]}`}
                />
                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: "center",
                    marginHorizontal: 10,
                  }}
                >
                  {activity.firstname} {activity.lastname}
                </Text>
              </View>
              <Text
                style={{ fontSize: 20, fontWeight: "600", marginVertical: 10 }}
                onPress={() => navigation.navigate("Single", activity)}
              >
                {activity.title}
              </Text>
              <Text>
                {activity.desciption.length < 150
                  ? activity.desciption
                  : `${activity.desciption.slice(0, 150)}...`}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 10,
                }}
              >
                <View>
                  <Text>Distance</Text>
                  <Text>{activity.distance}mi</Text>
                </View>
                <View>
                  <Text>Duration</Text>
                  <Text>
                    {activity.hrs}h {activity.min}m {activity.sec}s
                  </Text>
                </View>
                <View>
                  <Text>Pace</Text>
                  <Text>
                    {averagePace(
                      activity.hrs,
                      activity.min,
                      activity.sec,
                      activity.distance
                    )}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profile;
