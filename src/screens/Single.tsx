import * as React from "react";
import { View } from "react-native";
import { Card, Text, Avatar, Divider } from "react-native-elements";
import Ionicon from "react-native-vector-icons/Ionicons";
import { IActivity } from "../utils/types";
import { GetUser } from "../utils/api";
import Icon from "react-native-vector-icons/FontAwesome5";
import { averagePace } from "../utils/Functions";
import Edit from "../components/Edit";

export const Single = ({ route, navigation }: any) => {
  const [userid, setUserid] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(false);

  const displayIcon = (type: string) => {
    if (type === "Run") {
      return <Icon name="running" size={20} color="#ccc" />;
    } else if (type === "Walk") {
      return <Icon name="walking" size={20} color="#ccc" />;
    } else if (type === "Bike") {
      return <Icon name="bicycle" size={20} color="#ccc" />;
    } else if (type === "Swim") {
      return <Icon name="swimmer" size={20} color="#ccc" />;
    }
  };

  const activity: IActivity = route.params;

  React.useLayoutEffect(() => {
    (async () => {
      let { userid } = await GetUser();
      setUserid(userid);
    })();
    navigation.setOptions({
      headerBackTitle: "Feed",
      headerBackStyle: { color: "#white" },
    });
  }, []);

  return (
    <View>
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
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
            {displayIcon(activity.type)}
          </View>
          {userid === activity.userid ? (
            <Ionicon
              name="ios-help-circle-outline"
              size={30}
              color="#ff7600"
              onPress={() => setVisible(!visible)}
            />
          ) : null}
        </View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 20 }}>
          {activity.title}
        </Text>
        <Text style={{ fontSize: 18 }}>{activity.desciption}</Text>
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
      <Edit
        overlay={{ visible, setter: setVisible, id: activity.id, navigation }}
      />
    </View>
  );
};

export default Single;
