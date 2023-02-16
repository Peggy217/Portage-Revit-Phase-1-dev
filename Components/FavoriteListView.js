import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ContentfulDataContext } from "../ContentfulContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/FavoriteListViewStyle";

// Handles the ListView for favorites tab
function FavoriteListView({ navigation }) {
  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  // Gets the articles, people, and cultures from context and finds
  // the correct ones for display on the page
  const { articles, people, cultures } = useContext(ContentfulDataContext);
  // Stores the async storage array that contains the amount of favorite Ids whether its places, people or culture
  const [favoriteList, setFavoriteList] = useState([]);
  // Combines the articles, people, and culture files
  const historicalInformation = articles.concat(people).concat(cultures);
  // Checks whether there is favorite ids stored in the async storage and returning the historical information
  // associated with the ids every time that there is favorites added or removed
  useEffect(() => {
    AsyncStorage.getItem("favorites").then((favoriteId) => {
      if (favoriteId !== null) {
        const favoriteFilter = historicalInformation.filter((info) => {
          return favoriteId.includes(info.id);
        });
        setFavoriteList(favoriteFilter);
      }
    });
  }, [AsyncStorage.getItem("favorites")]);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: window.width,
      }}
    >
      {favoriteList.length === 0 && (
        <View style={styles.noFav}>
          <Text style={styles.noFavFont}>No Favorites</Text>
        </View>
      )}
      {/* Handles the preview for all articles. */}
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={favoriteList}
        style={styles.link}
        initialNumToRender={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push(item.type, { Id: item.id });
            }}
          >
            <View style={styles.previewText}>
              <Image
                source={{ uri: item.images[0] }}
                style={styles.imageBottom}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>
                {item.description.substring(0, 120)}...
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default FavoriteListView;
