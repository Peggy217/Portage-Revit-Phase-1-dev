import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const TourStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  image: {
    height: 300,
    borderWidth: 0,
    resizeMode: "stretch",
    margin: 0,
  },
  title: {
    fontWeight: "bold",
    paddingLeft: 8,
    fontSize: 24,
  },
  content: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#faedcd",
    width: 100,
    alignSelf: "center",
    borderWidth: 1,
  },
  historicalSiteTitle: {
    fontSize: 18,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  historicalSiteLinks: {
    paddingLeft: 8,
    paddingRight: 8,
    color: "blue",
    textDecorationLine: "underline",
  },
  tourText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
export default TourStyle;
