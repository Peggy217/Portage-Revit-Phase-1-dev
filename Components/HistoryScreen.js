import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesListView from "./PlacesListView";
import { View, StatusBar } from "react-native";
import PeopleListView from "./PeopleListView";
import CultureListView from "./CultureListView";
import Places from "../Components/Places";
import People from "../Components/People";
import Cultures from "../Components/Cultures";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Creates a top tab navigator
const Tab = createMaterialTopTabNavigator();
// Handles the History screen view
function HistoryScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 32, backgroundColor: "#d4a373" }}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#d4a373"
        translucent={true}
      />
      <Tab.Navigator
        initialRouteName="Place"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: { backgroundColor: "#d4a373" },
        }}
      >
        <Tab.Screen name="Place" component={PlacesListView} />
        <Tab.Screen name="Culture" component={CultureListView} />
        <Tab.Screen name="People" component={PeopleListView} />
      </Tab.Navigator>
    </View>
  );
}

// Creates a new stack that will contain screens that can be transitioned to
const Stack = createNativeStackNavigator();

function History({}) {
  return (
    <Stack.Navigator initialRouteName="HistoryScreen">
      <Stack.Screen
        name="HistoryOutline"
        options={{ header: () => null, headerBackTitle: "Back" }}
        component={HistoryScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="PlacesList"
        options={{ header: () => null, headerBackTitle: "Back" }}
        component={PlacesListView}
      />
      <Stack.Screen
        name="CulturesList"
        options={{ header: () => null, headerBackTitle: "Back" }}
        component={CultureListView}
      />
      <Stack.Screen
        name="PeopleList"
        options={{ header: () => null, headerBackTitle: "Back" }}
        component={PeopleListView}
      />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          title: "Place",
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
          title: "Culture",
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
          title: "Person",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

export default History;
