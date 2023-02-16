import { StyleSheet } from "react-native";

const TourListViewStyle = StyleSheet.create({
  imageBottom: {
    flex: 1,
    borderRadius: 10,
    width: "95%",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageContainer: {
    resizeMode: "stretch",
    height: 200,
    borderRadius: 9,
  },
  previewText: {
    width: "100%",
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "rgba(250, 235, 215, 0.3)",
  },
  title: {
    fontWeight: "bold",
    width: "95%",
    paddingLeft: 10,
    fontSize: 16,
  },
  link: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "rgba(250, 235, 215, 0.2)",
  },
  content: {
    width: "95%",
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default TourListViewStyle;
