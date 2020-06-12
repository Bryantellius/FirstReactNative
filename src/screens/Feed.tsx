import * as React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../utils/styles";
import { IActivity } from "../utils/types";
import { apiService, GetUser } from "../utils/api";
import ActivityCard from "../components/ActivityCard";

export const Feed = ({ navigation }: any) => {
  const [activities, setActivities] = React.useState<IActivity[]>([]);
  const [userid, setUserid] = React.useState<number>(0);

  const _getActivities = async () => {
    let { userid } = await GetUser();
    setUserid(userid);
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
          <ActivityCard
            activity={activity}
            navigation={navigation}
            user={userid}
            key={activity.id}
          />
        );
      })}
    </ScrollView>
  );
};

export default Feed;
