import * as React from "react";
import { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Places from "./Places";
import People from "./People";
import Cultures from "./Cultures";
import Map from "./Mapping/Map";
import ToursListView from "./ToursListView";
import Tours from "./Tours";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

// Handles the explore screen view
function ExploreHome({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [permissionLocationAllowed, setPermissionLocationAllowed] =
    useState(false);
  const [errorText, setErrorText] = useState("");
  const isFocused = useIsFocused();

  const checkLocationPermissions = async () => {
    try {
      setLoading(true);

      let { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        navigation.navigate("Map", { status: status });
      } else {
        setPermissionLocationAllowed(false);

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          navigation.navigate("Map", { status: status });
        } else {
          setLoading(false);
        }
      }
    } catch (err) {
      setErrorText(err);
    }
  };

  useEffect(() => {
    checkLocationPermissions();
    // AsyncStorage.getItem("showToast").then((value) => {
    //   if (value === "true") {
    //     Toast.show({
    //       type: "error",
    //       text1: "Map Access Denied!",
    //       text2: "You need to share your location in your device.",
    //     });
    //     AsyncStorage.removeItem("showToast");
    //   }
    // });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {loading && !permissionLocationAllowed ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>
            ERROR: To use this feature please enable location within the
            settings.
          </Text>
          <Button
            title="Allow Location Permission"
            onPress={checkLocationPermissions}
          ></Button>
        </>
      )}
      <Text>{errorText}</Text>
    </View>

    // <ReactNativeZoomableView
    //   style={styles.container}
    //   maxZoom={2}
    //   minZoom={1}
    //   initialZoom={1}
    //   zoomStep={0.5}
    // >
    //   <View style={styles.buttonDiv}>
    //     <Button
    //       title="Explore"
    //       onPress={() => navigation.navigate("Map")}
    //       color="#841584"
    //       width="10"
    //       accessibilityLabel="Dive right into you own adventure!."
    //     />
    //   </View>
    //   <Toast />
    // </ReactNativeZoomableView>
  );
}

// Handles the styling of the ExploreScreen.js view.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDiv: {
    width: "90%",
    marginBottom: 10,
  },
  lastButtonDiv: {
    width: "90%",
  },
});

// Creates a new stack that will contain screens that can be transitioned to
const Stack = createNativeStackNavigator();

function ExploreRoute({}) {
  return (
    <Stack.Navigator initialRouteName="ExploreHome">
      <Stack.Screen
        name="ExploreRoute"
        options={{ header: () => null, headerBackTitle: "Back" }}
        component={ExploreHome}
      ></Stack.Screen>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Map",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="TourList"
        component={ToursListView}
        options={{
          title: "Tour List",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitleStyle: false,
        }}
      />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          title: "Places",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="Peoples"
        component={People}
        options={{
          title: "People",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="Cultures"
        component={Cultures}
        options={{
          title: "Cultures",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="Tours"
        component={Tours}
        options={{
          title: "Tours",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

export default ExploreRoute;
