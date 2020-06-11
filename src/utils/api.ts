import { AsyncStorage } from "react-native";

export let GetAccessToken = async () => {
  let token: any = await AsyncStorage.getItem("token");
  return token;
};

export const GetUser = async () => {
  let User: any = await AsyncStorage.getItem("user");
  return JSON.parse(User);
};
// Function for api calls, takes in url, method, body;
// Returns res.json of call
export const apiService = async <T = any>(
  url: string,
  method: string = "GET",
  body?: {}
) => {
  const headers: any = {
    "Content-Type": "application/json",
  };
  let token: string = await GetAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    if (res.ok) {
      return <T>await res.json();
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const SetAccessToken = async (
  token: string,
  user: {} = { userid: undefined, role: undefined }
) => {
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("user", JSON.stringify(user));
};
