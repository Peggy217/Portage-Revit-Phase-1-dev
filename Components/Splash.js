import { View, Text, TouchableHighlight } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

//Handles the splash page
const Splash = ({ navigation }) => {
  /* Have a useState so that we can target the timer's useEffect
   * If the user does not click anything on the splash screen, they'll automatically be redirected to the Acknowledgement screen in 10 seconds.
   * Upon first boot of the app, the user will be sent to the acknowledgment screen every 5 times the application is opened.
   */

  //Sets the state for keeping track of the amount of times the application is opened
  const [acknowledgementCount, setAcknowledgementCount] = useState(0);
  // Handles the timer for automatically redirecting the user to the next screen
  const [timerState, setTimerState] = useState(null);
  let timer = null;
  // Use effect that sets the timer on how long the user stays on the loadup screen before being redirected automatically to the Acknowledgement Screen
  useEffect(() => {
    timer = setTimeout(() => {
      move();
    }, 10000);
    setTimerState(timer);

    //Remove the profile on load
    //AsyncStorage.removeItem("Profile");

    return () => {
      clearTimeout(timer);
    };
  }, []);

  //Use effect that tracks everytime the user opens the application and taking the value of the key and assigning it to count through the async function.
  useEffect(() => {
    AsyncStorage.getItem("showAcknowledgement").then((value) => {
      let count = Number(value) || 0;
      setAcknowledgementCount(count++);
      AsyncStorage.setItem("showAcknowledgement", count.toString());
    });
  }, []);

  // The function will navigate the user to the acknowledgement screen for every 5 times the application is opened. Otherwise the user will be taken to the home page.
  const move = async () => {
    if (acknowledgementCount % 5 === 0) {
      navigation.replace("Acknowledgment");
    } else {
      const profile = await AsyncStorage.getItem("Profile");

      if (profile == null) {
        navigation.replace("ProfileCreation");
      } else {
        navigation.replace("Home");
      }
    }
  };

  return (
    <TouchableHighlight
      style={{ flex: 1 }} //
      onPress={() => move()}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30 }}>PORTAGE ADVENTURES</Text>
        <Text>Touch Anywhere to Begin!</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Splash;
