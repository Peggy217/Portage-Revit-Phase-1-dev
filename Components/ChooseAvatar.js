import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  SafeAreaView,
  LogBox,
} from "react-native";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PressableButtonStyles from "../styles/ProfileCreationButton";

const ChooseAvatar = ({ navigation, route }) => {
  const [seed, setSeed] = useState(
    route?.params?.seed ? route.params.seed : Math.floor(Math.random() * 10000)
  );
  const [selected, setSelected] = useState(
    route?.params?.selected ? route.params.selected : false
  );
  const [avatar, setAvatar] = useState({ style: null, seed: null });
  const [refreshButtonDisabled, setRefreshButtonDisabled] = useState(false);

  const refreshAvatars = () => {
    setSeed(() => Math.floor(Math.random() * 10000));
    setSelected(false);
  };

  const currentlySelected = (value) => {
    setSelected(value);
  };

  const getSelectedAvatar = (newStyle, newSeed) => {
    setAvatar((current) => ({ ...current, style: newStyle, seed: newSeed }));
  };

  const handleRefresh = () => {
    refreshAvatars();
    setRefreshButtonDisabled(true);
    setTimeout(() => {
      setRefreshButtonDisabled(false);
    }, 2000);
  };

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const handleFinishButtonClick = async () => {
    try {
      if (await route.params.selectName(route.params.name)) {
        const profile = { name: route.params.name, avatar };
        const stringProfile = JSON.stringify(profile);

        await AsyncStorage.setItem("Profile", stringProfile);

        navigation.navigate("Home");
      } else {
        const title = `The username ${route.params.name} is unavailable.`;

        navigation.navigate("ChooseName", { seed, title, selected });
      }
    } catch (error) {
      Alert.alert(error);
    }
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarDisplay}>
          <Avatar
            index={"0"}
            seed={seed}
            isSelected={currentlySelected}
            selectedAvatar={getSelectedAvatar}
            selected={selected}
          />

          <Avatar
            index={"1"}
            seed={seed}
            isSelected={currentlySelected}
            selectedAvatar={getSelectedAvatar}
            selected={selected}
          />
          <Avatar
            index={"2"}
            seed={seed}
            isSelected={currentlySelected}
            selectedAvatar={getSelectedAvatar}
            selected={selected}
          />
        </View>
        <View style={styles.avatarDisplay}>
          <Avatar
            index={"3"}
            seed={seed}
            isSelected={currentlySelected}
            selectedAvatar={getSelectedAvatar}
            selected={selected}
          />
          <Avatar
            index={"4"}
            seed={seed}
            isSelected={currentlySelected}
            selectedAvatar={getSelectedAvatar}
            selected={selected}
          />
          <Avatar
            index={"5"}
            seed={seed}
            isSelected={currentlySelected}
            selectedAvatar={getSelectedAvatar}
            selected={selected}
          />
        </View>
      </View>
      <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
        <Pressable
          style={({ pressed }) => [
            PressableButtonStyles.buttonWhite,
            pressed && { opacity: 0.8, backgroundColor: "#CCC" },
          ]}
          onPress={handleRefresh}
          disabled={refreshButtonDisabled}
        >
          <Text style={styles.textBlack}>Regenerate</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            selected
              ? PressableButtonStyles.buttonBlack
              : {
                  ...PressableButtonStyles.buttonBlack,
                  backgroundColor: "#CCC",
                },
            pressed && { opacity: 0.8 },
          ]}
          disabled={!selected}
          onPress={handleFinishButtonClick}
        >
          <Text style={PressableButtonStyles.textWhite}>Finish</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingTop: Platform.OS == "android" ? "20%" : 0,
  },
  avatarDisplay: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflow: "hidden",
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  heading: {
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
  },
});

export default ChooseAvatar;
