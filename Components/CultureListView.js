import React, { useContext } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ContentfulDataContext } from "../ContentfulContext";
import styles from "../styles/CulturesListViewStyle";
// Handles the ListView for cultures
function CultureListView({ navigation }) {
  // Gets the screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  // Gets the cultures from context and finds the correct display for the page
  const { cultures } = useContext(ContentfulDataContext);

  return (
    <View
      style={{
        flex: 1,
        height: window.height,
        width: window.width,
      }}
    >
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={cultures}
        style={styles.link}
        initialNumToRender={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push("Cultures", { Id: item.id });
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

export default CultureListView;
