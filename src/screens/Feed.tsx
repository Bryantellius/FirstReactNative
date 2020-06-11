import * as React from "react";
import { ScrollView, View } from "react-native";
import { Card, Text, Avatar } from "react-native-elements";
import { styles } from "../utils/styles";
import { IActivity } from "../utils/types";
import { apiService } from "../utils/api";
import { averagePace } from "../utils/Functions";

export const Feed = ({ navigation }: any) => {
  const [activities, setActivities] = React.useState<IActivity[]>([]);

  const _getActivities = async () => {
    try {
      let activities = await apiService(
        "https://still-taiga-99815.herokuapp.com/api/activities"
      );
      setActivities(activities);
    } catch (err) {
      console.log("Error fetching activities :(");
    }
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      _getActivities();
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {activities?.map((activity: IActivity) => {
        return (
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
        );
      })}
    </ScrollView>
  );
};

export default Feed;
