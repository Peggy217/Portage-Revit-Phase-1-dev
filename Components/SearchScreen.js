import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Places from "../Components/Places";
import People from "../Components/People";
import Cultures from "../Components/Cultures";
import ToursListView from "./ToursListView";
import Tours from "./Tours";
import SearchPage from "./SearchPage";

// Creates a new stack that will contain screens that can be transitioned to
const Stack = createNativeStackNavigator();
// Handles the search screen view
function SearchScreen({}) {
  return (
    <Stack.Navigator initialRouteName="SearchPage">
      <Stack.Screen
        name="SearchPage"
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
        }}
        component={SearchPage}
      ></Stack.Screen>
      <Stack.Screen
        name="TourList"
        component={ToursListView}
        options={{
          title: "Tour List",
          headerStyle: {
            backgroundColor: "#d4a373",
          },
          headerBackTitle: "Back",
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

export default SearchScreen;
