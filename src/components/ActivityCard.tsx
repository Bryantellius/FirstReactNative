import * as React from "react";
import { View } from "react-native";
import { Card, Avatar, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { averagePace } from "../utils/Functions";

export const ActivityCard = (props: any) => {
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

  return (
    <View key={`${props.activity.id}-${props.activity.lastname}`}>
      <Card>
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
            title={`${props.activity.firstname[0]}${props.activity.lastname[0]}`}
            onPress={() => {
              props.activity.userid === props.user
                ? props.navigation.navigate("Profile")
                : props.navigation.navigate("Member", {
                    id: props.activity.userid,
                  });
            }}
          />
          <Text
            style={{
              fontSize: 15,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          >
            {props.activity.firstname} {props.activity.lastname}
          </Text>
          {displayIcon(props.activity.type)}
        </View>
        <Text
          style={{ fontSize: 20, fontWeight: "600", marginVertical: 10 }}
          onPress={() => props.navigation.navigate("Single", props.activity)}
        >
          {props.activity.title}
        </Text>
        <Text>
          {props.activity.desciption.length < 150
            ? props.activity.desciption
            : `${props.activity.desciption.slice(0, 150)}...`}
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
            <Text>{props.activity.distance}mi</Text>
          </View>
          <View>
            <Text>Duration</Text>
            <Text>
              {props.activity.hrs}h {props.activity.min}m {props.activity.sec}s
            </Text>
          </View>
          <View>
            <Text>Pace</Text>
            <Text>
              {averagePace(
                props.activity.hrs,
                props.activity.min,
                props.activity.sec,
                props.activity.distance
              )}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default ActivityCard;
