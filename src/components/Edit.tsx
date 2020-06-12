import * as React from "react";
import { View, ScrollView, Picker } from "react-native";
import { Overlay, Text, Input, Button } from "react-native-elements";
import { apiService } from "../utils/api";
import { Alert } from "react-native";

export const Edit = (props: any) => {
  const [title, setTitle] = React.useState<string>("");
  const [Desciption, setDesciption] = React.useState<string>("");
  const [type, settype] = React.useState<string>("");
  const [Distance, setDistance] = React.useState<number>(0);
  const [hrs, sethrs] = React.useState<number>(0);
  const [min, setmin] = React.useState<number>(0);
  const [sec, setsec] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      try {
        let res = await apiService(
          `https://still-taiga-99815.herokuapp.com/api/activities/${props.overlay.id}`
        );
        setTitle(res.title);
        setDesciption(res.desciption);
        setDistance(res.distance);
        settype(res.type);
        sethrs(res.hrs);
        setmin(res.min);
        setsec(res.sec);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const renderOptions = (max: number) => {
    let options: any[] = [];
    for (let i = 0; i <= max; i++) {
      options.push(<Picker.Item key={i} label={`${i}`} value={i} />);
    }
    return options;
  };

  const updateActivity = async () => {
    let body = {
      title,
      desciption: Desciption,
      type,
      distance: Distance,
      hrs,
      min,
      sec,
    };
    try {
      let res = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/activities/${props.overlay.id}`,
        "PUT",
        body
      );
      if (res) {
        toggleOverlay();
        props.overlay.navigation.goBack();
      } else {
        Alert.alert("An error occured while updating this activity :(");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteActivity = async () => {
    try {
      let res = await apiService(
        `https://still-taiga-99815.herokuapp.com/api/activities/${props.overlay.id}`,
        "DELETE"
      );
      if (res) {
        toggleOverlay();
        props.overlay.navigation.goBack();
      } else {
        Alert.alert("An error occured while deleting this activity :(");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleOverlay = () => {
    props.overlay.setter(!props.overlay.visible);
  };

  return (
    <Overlay isVisible={props.overlay.visible} onBackdropPress={toggleOverlay}>
      <View>
        <ScrollView style={{ flex: 1 }}>
          <Text
            h3Style={{
              textAlign: "center",
              marginVertical: 10,
              padding: 10,
              borderBottomColor: "#ff7600",
              borderBottomWidth: 1,
            }}
            h3
          >
            Add Activity
          </Text>
          <View style={{ padding: 20 }}>
            <Input
              label="Title"
              value={title}
              placeholder=""
              onChangeText={(text: any) => setTitle(text)}
            />
            <Input
              label="Description"
              multiline
              numberOfLines={5}
              value={Desciption}
              placeholder=""
              onChangeText={(text: any) => setDesciption(text)}
            />
          </View>

          <View
            style={{
              padding: 20,
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Type</Text>
              <Picker
                style={{
                  borderColor: "#ff7600",
                  borderRadius: 15,
                  borderWidth: 1,
                  width: 100,
                }}
                selectedValue={type}
                onValueChange={(itemValue: React.ReactText) =>
                  settype(itemValue.toString())
                }
              >
                <Picker.Item label="Run" value="Run" />
                <Picker.Item label="Walk" value="Walk" />
                <Picker.Item label="Bike" value="Bike" />
                <Picker.Item label="Swim" value="Swim" />
              </Picker>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Distance</Text>
              <Picker
                style={{
                  borderColor: "#ff7600",
                  borderRadius: 15,
                  borderWidth: 1,
                  width: 100,
                }}
                selectedValue={Distance}
                onValueChange={(itemValue: React.ReactText) =>
                  setDistance(Number(itemValue))
                }
              >
                {renderOptions(100)}
              </Picker>
            </View>
          </View>

          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <Text>Hours</Text>
              <Picker
                style={{
                  borderColor: "#ff7600",
                  borderRadius: 15,
                  borderWidth: 1,
                  width: 50,
                }}
                selectedValue={hrs}
                onValueChange={(itemValue: React.ReactText) =>
                  sethrs(Number(itemValue))
                }
              >
                {renderOptions(24)}
              </Picker>
            </View>

            <View>
              <Text>Minutes</Text>
              <Picker
                style={{
                  borderColor: "#ff7600",
                  borderRadius: 15,
                  borderWidth: 1,
                  width: 50,
                }}
                selectedValue={min}
                onValueChange={(itemValue: React.ReactText) =>
                  setmin(Number(itemValue))
                }
              >
                {renderOptions(59)}
              </Picker>
            </View>

            <View>
              <Text>Seconds</Text>
              <Picker
                style={{
                  borderColor: "#ff7600",
                  borderRadius: 15,
                  borderWidth: 1,
                  width: 50,
                }}
                selectedValue={sec}
                onValueChange={(itemValue: React.ReactText) =>
                  setsec(Number(itemValue))
                }
              >
                {renderOptions(59)}
              </Picker>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            title="Update"
            buttonStyle={{ backgroundColor: "#ff7600" }}
            raised
            onPress={() => updateActivity()}
          />
          <Button
            title="Delete"
            buttonStyle={{ backgroundColor: "tomato" }}
            raised
            onPress={() => deleteActivity()}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default Edit;
