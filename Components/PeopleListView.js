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
import styles from "../styles/PeopleListViewStyle";
// Handles the ListView for people
function PeopleListView({ navigation }) {
  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  const { people } = useContext(ContentfulDataContext);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: window.width,
      }}
    >
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={people}
        initialNumToRender={5}
        style={styles.link}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push("Peoples", { Id: item.id });
            }}
          >
            <View style={styles.previewText}>
              <Image
                source={{ uri: item.images[0] }}
                style={styles.imageBottom}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>
                {item.description.substring(0, 130)}...
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default PeopleListView;
