import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Animals } from "../assets/Animals";
import { Adjectives } from "../assets/Adjectives";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import PressableButtonStyles from "../styles/ProfileCreationButton.js";
import { SUPABASE_URL, SUPABASE_KEY } from "react-native-dotenv";

const ChooseName = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [usernameList, setUsernameList] = useState([]);
  const [refreshButtonDisabled, setRefreshButtonDisabled] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const seed = route?.params?.seed;
  const selected = route?.params?.selected;

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const refreshNames = () => {
    setName("");

    let newNames = [];
    let newName = "";

    while (newNames.length < 9) {
      newName = capitalizeLetter(
        Adjectives[Math.floor(Math.random() * Adjectives.length)] +
          capitalizeLetter(Animals[Math.floor(Math.random() * Animals.length)])
      );

      while (!checkEqual(newName)) {
        newName = capitalizeLetter(
          Adjectives[Math.floor(Math.random() * Adjectives.length)] +
            capitalizeLetter(
              Animals[Math.floor(Math.random() * Animals.length)]
            )
        );
      }
      newNames.push(newName);
    }
    setDisabled(true);
    setUsernameList(newNames);
  };

  useEffect(() => {
    refreshNames();
  }, []);

  useEffect(() => {
    setDisabled(true);
  }, [usernameList, route]);

  const selectName = async (inputName) => {
    let valid = false;

    if (await checkEqual(inputName)) {
      const { error } = await supabase
        .from("Users")
        .insert({ username: inputName });
      valid = true;
    }
    return valid;
  };

  const handleRefresh = () => {
    refreshNames();
    setRefreshButtonDisabled(true);
    setTimeout(() => {
      setRefreshButtonDisabled(false);
    }, 2000);
  };

  const checkEqual = async (username) => {
    let valid = false;
    const { data } = await supabase
      .from("Users")
      .select()
      .eq("username", username);

    if (data.length < 1) {
      valid = true;
    }
    return valid;
  };

  const onTap = (name) => {
    setName(name);
    setDisabled(false);
  };

  const handleFinishNameButtonClick = () => {
    if (seed != null) {
      const options = { name, selectName, seed, selected };
      navigation.navigate("ChooseAvatar", options);
    } else {
      const options = { name, selectName };
      navigation.navigate("ChooseAvatar", options);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View
          style={{
            flexGrow: 0.5,
            flexShrink: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>
            {route?.params?.title ? route.params.title : "Choose Username"}
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <FlatList
            data={usernameList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={item === name ? { backgroundColor: "#CCC" } : ""}
                onPress={() => {
                  onTap(item);
                }}
              >
                <Text
                  style={item === name ? styles.selected : styles.notSelected}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            PressableButtonStyles.buttonWhite,
            pressed && { opacity: 0.8, backgroundColor: "#CCC" },
          ]}
          onPress={handleRefresh}
          disabled={refreshButtonDisabled}
        >
          <Text style={PressableButtonStyles.textBlack}>Refresh</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            !disabled
              ? PressableButtonStyles.buttonBlack
              : {
                  ...PressableButtonStyles.buttonBlack,
                  backgroundColor: "#CCC",
                },
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleFinishNameButtonClick}
          disabled={disabled}
        >
          <Text style={PressableButtonStyles.textWhite}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? "20%" : 0,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  heading: {
    fontSize: 36,
    justifyContent: "center",
    alignSelf: "center",
    padding: 4,
  },
  name: {
    padding: 4,
    textAlign: "center",
    fontSize: 30,
  },
  selected: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
  },
  notSelected: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
});

export default ChooseName;
