import React, { useContext, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ContentfulDataContext } from "../ContentfulContext";
import styles from "../styles/PlacesListViewStyle";

// Handles the ListView for places
function PlacesListView({ navigation }) {
  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  const { articles } = useContext(ContentfulDataContext);

  return (
    <View
      style={{
        flex: 1,
        width: window.width,
        height: window.height,
      }}
    >
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={articles}
        initialNumToRender={5}
        style={styles.link}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push("Places", { Id: item.id });
            }}
          >
            <View style={styles.previewText}>
              <View style={styles.imageBottom}>
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.imageContainer}
                />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>
                {item.description.substring(0, 200)}...
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default PlacesListView;
