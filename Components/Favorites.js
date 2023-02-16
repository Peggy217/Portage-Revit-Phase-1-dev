import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/FavoriteStyle";
const F_IMAGE = require("./Mapping/Images/favorite.png");
const UnF_IMAGE = require("./Mapping/Images/unfavorite.png");

// Handles the favorite functions
const Favourite = ({ itemId }) => {
  // Boolean statement that returns true or false if the historical information is currently stored in the async storage or not
  const [isFavorite, setIsFavorite] = useState(false);

  // Checks whether a historical page is favorited or not by checking if it exists in the async storage
  useEffect(() => {
    const checkFavorite = async () => {
      const favoriteId = await AsyncStorage.getItem("favorites");

      if (favoriteId !== null && favoriteId.includes(itemId)) {
        setIsFavorite(true);
      }
    };

    checkFavorite();
  }, []);

  // Toggles whether the historical page is favorited or not by adding or removing its id in the async storage
  async function toggleFavorites() {
    const favoritesJson = (await AsyncStorage.getItem("favorites")) || "[]";
    let favorites = JSON.parse(favoritesJson);

    if (!isFavorite) {
      favorites.push(itemId);
    } else {
      favorites = favorites.filter((storedId) => itemId !== storedId);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite((current) => !current);
  }

  return (
    <TouchableOpacity onPress={() => toggleFavorites()}>
      <Image
        source={isFavorite ? F_IMAGE : UnF_IMAGE}
        style={styles.favorite}
      />
    </TouchableOpacity>
  );
};

export default Favourite;
