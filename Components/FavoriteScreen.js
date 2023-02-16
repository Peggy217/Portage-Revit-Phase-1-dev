import * as React from "react";
import FavoriteListView from "./FavoriteListView";
import Places from "../Components/Places";
import People from "../Components/People";
import Cultures from "../Components/Cultures";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Handles the favorite screen view
function Favorite() {
  // Creates a new stack that will contain screens that can be transitioned to
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="FavoriteScreen">
      <Stack.Screen
        name="Favorite List"
        options={{
          title: "Favorites",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
        }}
        component={FavoriteListView}
      ></Stack.Screen>
      <Stack.Screen name="FavoriteList" component={FavoriteListView} />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          title: "Place",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
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
        }}
      />
    </Stack.Navigator>
  );
}

export default Favorite;
