import { StyleSheet } from "react-native";

const FavoriteListViewStyle = StyleSheet.create({
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
    marginBottom: 10,
  },
  content: {
    width: "95%",
    paddingLeft: 135,
  },
  noFav: {
    justifyContent: "center",
    alignItems: "center",
    flex: 5,
  },
  noFavFont: {
    fontSize: 20,
  },
});

export default FavoriteListViewStyle;
