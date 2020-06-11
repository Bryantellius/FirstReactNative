import * as React from "react";
import { View, ScrollView, Picker } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { styles } from "../utils/styles";
import { apiService, GetUser } from "../utils/api";

export const Add = () => {
  const [title, setTitle] = React.useState<string>("");
  const [Desciption, setDesciption] = React.useState<string>("");
  const [type, settype] = React.useState<string>("");
  const [Distance, setDistance] = React.useState<number>(0);
  const [hrs, sethrs] = React.useState<number>(0);
  const [min, setmin] = React.useState<number>(0);
  const [sec, setsec] = React.useState<number>(0);

  const renderOptions = (max: number) => {
    let options: any[] = [];
    for (let i = 0; i <= max; i++) {
      options.push(<Picker.Item key={i} label={`${i}`} value={i} />);
    }
    return options;
  };

  const handleAdd = async () => {
    let { userid } = await GetUser();
    try {
      let res = await apiService(
        "https://still-taiga-99815.herokuapp.com/api/activities",
        "POST",
        {
          title,
          desciption: Desciption,
          type,
          distance: Distance,
          hrs,
          min,
          sec,
          userid,
        }
      );
      if (res.ok) {
        setTitle("");
        setDesciption("");
        setDistance(0);
        settype("");
        sethrs(0);
        setmin(0);
        setsec(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            borderBottomColor: "#ff7600",
            borderBottomWidth: 1,
            marginVertical: 10,
            padding: 10,
          }}
          h3
        >
          Add Activity
        </Text>
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
      <View style={{ margin: 10 }}>
        <Button
          title="Add"
          buttonStyle={{ backgroundColor: "#ff7600" }}
          raised
          onPress={() => handleAdd()}
        />
      </View>
    </View>
  );
};

export default Add;
