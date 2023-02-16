import { StyleSheet } from "react-native";

const AcknowledgeStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textDiv: {
    width: "90%",
    marginBottom: 25,
  },
  textStyle: {
    fontSize: 25,
  },
  buttonDiv: {
    flexDirection: "row",
  },
  allowButtonStyle: {
    width: "30%",
    marginRight: 25,
    marginBottom: 10,
  },
  dontButtonStyle: {
    width: "30%",
    marginBottom: 10,
  },
});

export default AcknowledgeStyle;
