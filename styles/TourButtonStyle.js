import { StyleSheet } from "react-native";

const TourButtons = StyleSheet.create({
  nextLocationText: { fontSize: 16, margin: 5 },
  nextLocation: { backgroundColor: "#faedcd", borderWidth: 1 },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    right: 25,
    bottom: 2,
  },
});

export default TourButtons;
