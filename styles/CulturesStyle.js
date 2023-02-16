import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const CulturesStyle = StyleSheet.create({
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
  imageContain: {
    height: 350,
  },
  favorite: {
    width: 33,
    height: 33,
    borderWidth: 0,
    resizeMode: "contain",
    marginLeft: 12,
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
  linkArticle: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    color: "blue",
    textDecorationLine: "underline",
  },
  articleTitle: {
    fontSize: 18,
    paddingLeft: 5,
    fontWeight: "bold",
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
  relevantPeopleContainer: {
    marginBottom: 10,
  },
});

export default CulturesStyle;
