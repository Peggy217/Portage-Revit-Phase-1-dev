import { StyleSheet } from "react-native";

const PeopleListViewStyle = StyleSheet.create({
  imageBottom: {
    width: "30%",
    height: 120,
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
    position: "absolute",
    borderRadius: 100,
  },
  previewText: {
    width: "100%",
    height: 150,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "rgba(250, 235, 215, 0.3)",
  },
  title: {
    fontWeight: "bold",
    width: "95%",
    paddingLeft: 135,
    paddingTop: 20,
    fontSize: 16,
  },
  link: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "rgba(250, 235, 215, 0.2)",
  },
  content: {
    width: "95%",
    paddingLeft: 135,
  },
});

export default PeopleListViewStyle;
