import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createAvatar } from "@dicebear/core";
import * as Avatars from "@dicebear/collection";
import { SvgXml } from "react-native-svg";

const Avatar = ({ index, seed, isSelected, selected, selectedAvatar }) => {
  const avatarStyleNames = [
    "adventurer",
    "micah",
    "avataars",
    "bottts",
    "bigSmile",
    "lorelei",
  ];
  const avatarstyles = [
    Avatars.adventurer,
    Avatars.micah,
    Avatars.avataaars,
    Avatars.bottts,
    Avatars.bigSmile,
    Avatars.lorelei,
  ];

  //Creates SVG of the avatar using style
  const avatar = createAvatar(avatarstyles[index], {
    seed: seed,
    radius: 50,
    scale: 80,
    size: 150,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
  }).toString();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        selectedAvatar(avatarStyleNames[index], seed);
        isSelected(index);
      }}
    >
      <View
        style={
          selected === index
            ? { borderWidth: 5, borderColor: "#000", borderRadius: 100 }
            : { borderWidth: 5, borderColor: "#FFF", borderRadius: 100 }
        }
      >
        <SvgXml xml={avatar} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Avatar;
