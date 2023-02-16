import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const PlacesStyle = StyleSheet.create({
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
  },
  imageContain: {
    height: 350,
  },
  title: {
    fontWeight: "bold",
    paddingLeft: 8,
    fontSize: 20,
  },
  content: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 10,
    paddingTop: 10,
  },
  linkPeople: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    color: "blue",
    textDecorationLine: "underline",
  },
  peopleTitle: {
    fontSize: 18,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  cultureContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    margin: 5,
  },
  culture: {
    fontWeight: "bold",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "orange",
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: "center",
    marginRight: 5,
    marginLeft: 5,
  },
  map: {
    height: 297,
    width: 347,
  },
  mapBorder: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    height: 300,
    width: 350,
    marginBottom: 10,
  },
  audioView: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 8,
  },
  relevantPeopleContainer: {
    marginBottom: 10,
  },
  locationButton: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#faedcd",
    width: 145,
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default PlacesStyle;
