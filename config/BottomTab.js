import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryScreen from "../Components/HistoryScreen";
import FavoriteScreen from "../Components/FavoriteScreen";
import ExploreHome from "../Components/ExploreHome";
import { RouterMap } from "./TabBarIcon";
import SearchScreen from "../Components/SearchScreen";

//Creates a bottom tab navigator
const Tab = createBottomTabNavigator();

//Handles the bottom tabs of the application (History, Explore, Favorites, and Search)
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="History"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return RouterMap[route.name](size, color);
        },
        tabBarStyle: { backgroundColor: "#d4a373" },
        tabBarLabelStyle: { color: "#000" },
        tabBarActiveTintColor: "#fefae0",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="History" component={HistoryScreen}></Tab.Screen>
      <Tab.Screen name="Explore" component={ExploreHome}></Tab.Screen>
      <Tab.Screen name="Favorite" component={FavoriteScreen}></Tab.Screen>
      <Tab.Screen name="Search" component={SearchScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigation;
