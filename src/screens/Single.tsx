import * as React from "react";
import { ScrollView, View } from "react-native";
import { Card, Text, Avatar, Divider } from "react-native-elements";
import { styles } from "../utils/styles";
import { IActivity } from "../utils/types";
import { apiService } from "../utils/api";
import { averagePace } from "../utils/Functions";

export const Single = ({ route, navigation }: any) => {
  const activity: IActivity = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Feed",
    });
  }, []);

  return (
    <View>
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Avatar
            rounded
            size="small"
            overlayContainerStyle={{ backgroundColor: "#ff7600" }}
            title={`${activity.firstname[0]}${activity.lastname[0]}`}
          />
          <Text
            style={{ fontSize: 15, alignSelf: "center", marginHorizontal: 10 }}
          >
            {activity.firstname} {activity.lastname}
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 20 }}>
          {activity.title}
        </Text>
        <Text style={{ fontSize: 15 }}>{activity.desciption}</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginVertical: 30,
          }}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>Distance</Text>
            <Text style={{ fontSize: 20 }}>{activity.distance}mi</Text>
          </View>
          <Divider />
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>Duration</Text>
            <Text style={{ fontSize: 20 }}>
              {activity.hrs}h {activity.min}m {activity.sec}s
            </Text>
          </View>
          <Divider />
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>Pace</Text>
            <Text style={{ fontSize: 20 }}>
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
  );
};

export default Single;
