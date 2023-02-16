import { StyleSheet, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");

const MapStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    height: screenHeight,
    width: screenWidth,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  linkview: {
    marginTop: 1,
    marginBottom: 159,
    marginLeft: 5.5,
    width: "97%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    margin: 15,
    borderWidth: 1,
    borderRadius: 2,
  },
  title: {
    position: "absolute",
    left: 40,
    width: 300,
    marginTop: 9,
    fontSize: 12,
  },
  optionsContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  optionsView: {
    height: 30,
    width: "50%",
    backgroundColor: "#faedcd",
    borderWidth: 1,
  },
  previewModalContainer: {
    width: "98%",
    height: 250,
    marginTop: screenHeight - 370,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 4,
  },
  linkContainer: {
    width: "100%",
    height: 393,
  },
  previewTitle: {
    fontWeight: "bold",
    paddingLeft: 8,
    fontSize: 16,
    height: 45,
    width: 370,
  },
  previewImage: {
    width: 125,
    height: 95,
    resizeMode: "contain",
    position: "absolute",
    left: 240,
    top: 140,
    borderRadius: 10,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    position: "absolute",
    left: 40,
    top: 170,
  },
  previewContainerText: {
    fontSize: 20,
    height: 40,
    width: 160,
    borderWidth: 2,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  previewText: {
    width: 380,
    height: 100,
    paddingLeft: 8,
  },
  modalToggle: {
    alignSelf: "flex-end",
    width: 20,
    height: 16,
    position: "absolute",
  },
  nearbyTitle: {
    color: "#5B5B5B",
    paddingLeft: 14,
    fontSize: 12,
    width: "60%",
    marginBottom: 4,
    marginTop: 4,
    fontWeight: "bold",
  },
  optionsText: {
    fontSize: 16,
    alignSelf: "center",
  },
  viewModalContainer: {
    height: 245,
    marginTop: screenHeight - 360,
    backgroundColor: "#F3F3F3",
    borderWidth: 1,
  },
});

export default MapStyle;
