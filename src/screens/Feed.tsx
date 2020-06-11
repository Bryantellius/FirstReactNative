import * as React from "react";
import { ScrollView, View, Alert } from "react-native";
import { Card, Text } from "react-native-elements";
import { styles } from "../utils/styles";
import { IActivity } from "../utils/types";
import { apiService } from "../utils/api";

export const Feed = ({navigation}: any) => {
  const [activities, setActivities] = React.useState<IActivity[]>([]);

  const _getActivities = async () => {
    try {
      let activities = await apiService(
        "https://still-taiga-99815.herokuapp.com/api/activities"
      );
      setActivities(activities);
    } catch (err) {
      Alert.alert("Error fetching activities :(");
    }
  };

  React.useEffect(() => {
    _getActivities();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {activities?.map((activity: IActivity) => {
        return (
          <Card key={`${activity.id}-${activity.lastname}`}>
            <Text>
              {activity.firstname} {activity.lastname}
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "600", marginVertical: 10 }}
            >
              {activity.title}
            </Text>
            <Text>{activity.desciption}</Text>
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
                <Text>Pace</Text>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default Feed;
