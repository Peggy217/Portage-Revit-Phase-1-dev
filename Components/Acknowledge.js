import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Button, Text } from "react-native";
import styles from "../styles/AcknowledgeStyle";

//Handles the Acknowledgement Screen
const Acknowledge = ({ navigation }) => {
  // Moves to the home page; also removes this page from the stack.
  const move = async () => {
    const profile = await AsyncStorage.getItem("Profile");

    if(profile == null)
    {
      navigation.replace("ProfileCreation");
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textDiv}>
        <Text style={styles.textStyle}>Acknowledgment Screen</Text>
        <Text>
          The use of this application takes place on Treaty One land, the
          traditional lands of the Anishinaabeg, Anishininewuk, Dakota Oyate,
          Denesuline and Nehethowuk Nations. Treaty One is also the homeland of
          the Red River Metis. The purpose of this app is to learn about the
          varied cultures that have been underrepresented in our shared
          historical understanding but whose contributions make up a large part
          of what is now Portage la Prairie. We hope you enter this app with an
          open mind and open heart, ready to broaden your understanding about
          the area we all call home, and the relatives who inhabit it with us
          and before us.
        </Text>
      </View>
      <View style={styles.buttonDiv}>
        <View style={styles.allowButtonStyle}>
          <Button
            title="Accept"
            onPress={() => move()}
            color="#841584"
            width="10"
            accessibilityLabel="Accept"
          />
        </View>
      </View>
    </View>
  );
};
export default Acknowledge;
