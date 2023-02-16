import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Components/Splash";
import HistoryScreen from "./Components/HistoryScreen";
import ExploreHome from "./Components/ExploreHome";
import Acknowledge from "./Components/Acknowledge";
import BottomLayout from "./config/BottomTab";
import { ContentfulContextProvider } from "./ContentfulContext";
import ProfileCreation from "./Components/ProfileCreation";

// Creates a new stack that will contain screens that can be transitioned to
const Stack = createNativeStackNavigator();
// App.js handles routing and main view.
function App() {
  return (
    // NavigationContainer holds all navigation routes.

    <ContentfulContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={Splash}
            options={{
              title: "Splash Screen",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Acknowledgment"
            component={Acknowledge}
            options={{
              title: "Acknowledgment Screen",
              headerShown: false,
            }}
          />

          <Stack.Screen name="ProfileCreation" component={ProfileCreation} options={{headerShown: false}} />

          <Stack.Screen
            name="Home"
            component={BottomLayout}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{
              title: "History",
              headerStyle: {
                backgroundColor: "#808080",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ExploreHome"
            component={ExploreHome}
            options={{
              title: "Explore",
              headerStyle: {
                backgroundColor: "#808080",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContentfulContextProvider>
  );
}

export default App;
