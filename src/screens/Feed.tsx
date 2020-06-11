import * as React from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "../utils/styles";
import { IActivity } from "../utils/types";
import { apiService } from "../utils/api";

export const Feed: React.FC = () => {
  const [activities, setActivities] = React.useState<IActivity[]>([]);

  const getActivities = async () => {
    try {
      let activities = await apiService(
        "https://still-taiga-99815.herokuapp.com/api/blogs"
      );
      setActivities(activities);
    } catch (err) {
      Alert.alert("Error fetching activities :(");
    }
  };

  React.useEffect(() => {
    getActivities();
  }, []);

  return (
    <View style={styles.container}>
      {activities?.map((activity: IActivity) => {
        return (
          <Text key={activity.id}>
            {activity.distance} by {activity.firstname}
          </Text>
        );
      })}
    </View>
  );
};

export default Feed;
