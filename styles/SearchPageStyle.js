import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const SearchPageStyle = StyleSheet.create({
  itemStyle: {
    padding: 10,
    textAlign: "left",
    fontSize: 14,
    width: 290,
  },
  image: {
    width: 55,
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    marginLeft: screenWidth - 395,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 320,
    marginLeft: 10,
    height: 60,
  },
  icon: {
    height: 10,
  },
  noResults: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  noResultsText: {
    fontSize: 16,
  },
  searchContainer: {
    height: screenHeight,
    width: screenWidth,
    flex: 1,
    display: "flex",
  },
});

export default SearchPageStyle;
