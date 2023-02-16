import { StyleSheet } from "react-native";

const PressableButtonStyles = StyleSheet.create({
  buttonBlack: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 19,
    borderRadius: 5,
    backgroundColor: "black",
    marginBottom: "10%",
  },
  buttonWhite: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 19,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: "10%",
  },
  textWhite: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textBlack: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default PressableButtonStyles;
