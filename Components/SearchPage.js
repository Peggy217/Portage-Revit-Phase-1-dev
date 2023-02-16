import React, { useState, useEffect, useContext, useRef } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { SearchBar } from "@rneui/base";
import { ContentfulDataContext } from "../ContentfulContext";
import styles from "../styles/SearchPageStyle";
import {
  AntDesign,
  Octicons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

// Handles the search page and its related functions
const SearchPage = ({ navigation }) => {
  // Gets the articles, people, and cultures from context and finds
  // the correct ones for display on the page
  const { articles, people, cultures, tours } = useContext(
    ContentfulDataContext
  );
  // Combines the articles, people, culture, and tours files
  const combinedArrays = articles.concat(people).concat(cultures).concat(tours);
  // Creates a data provider that renders rows as long as row 1 is not equal to row 2
  const createDataProvider = new DataProvider((r1, r2) => r1 !== r2);
  // Stores the value that is being typed in the search bar
  const [search, setSearch] = useState("");
  // Stores the filtered search results that match the vlaue that the user is typing in the search bar
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  // Stores all the search results
  const [masterDataSource, setMasterDataSource] = useState([]);
  // Use state that sets the data provider
  const [dataProvider, setDataProvider] = useState(createDataProvider);

  // Gets screen width usng window dimentions
  const { width: screenWidth } = Dimensions.get("window");

  // Controls the layout for each item being displayed in the list
  const newLayoutProvider = new LayoutProvider(
    (index) => 1,
    (type, dim) => {
      dim.width = screenWidth;
      dim.height = 60;
    }
  );

  // Note: RecyclerListView cannot be empty and thats what this use effect is for
  // For more information about RecyclerListView, refer to this link https://github.com/Flipkart/recyclerlistview
  // Use effect that sets the data to all the search results when user is not searching and changes the data to the filtered resuls when user starts searching for data
  useEffect(() => {
    if (search === "" || filteredDataSource === null) {
      setDataProvider(createDataProvider.cloneWithRows(combinedArrays));
    } else {
      setDataProvider(createDataProvider.cloneWithRows(filteredDataSource));
    }
  }, [filteredDataSource]);

  // Sets the all results to the combined contentful data
  useEffect(() => {
    setMasterDataSource(combinedArrays);
    setDataProvider(createDataProvider.cloneWithRows(combinedArrays));
  }, []);

  // Search function that filters the search results based on the text that the user is inputting in the search bar
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (newData.length > 0) {
        setFilteredDataSource(newData);
      } else {
        setFilteredDataSource(null);
      }

      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource.title);
      setSearch(text);
    }
  };

  // Controls the display of search results
  const itemView = (type, filteredDataSource) => {
    const item = filteredDataSource;
    let icons = (
      <View styles={styles.icon}>
        {item.type === "Places" && (
          <AntDesign name="home" size={24} color="black" />
        )}
        {item.type === "Peoples" && (
          <Octicons name="person" size={24} color="black" />
        )}
        {item.type === "Cultures" && (
          <Ionicons name="earth-outline" size={24} color="black" />
        )}
        {item.type === "Tours" && (
          <FontAwesome5 name="map-marked-alt" size={24} color="black" />
        )}
      </View>
    );

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.type, { Id: item.id });
          setFilteredDataSource([]);
          setSearch("");
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.mainContainer}>
            <View>{icons}</View>
            <Text style={styles.itemStyle}>{item.title.toUpperCase()}</Text>
          </View>
          <View>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          </View>
        </View>
        <View
          style={{
            height: 1.1,
            width: "100%",
            backgroundColor: "#C8C8C8",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.searchContainer}>
      <View>
        <SearchBar
          platform="default"
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder="Type query here..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          lightTheme="true"
          round="true"
          value={search}
        />
      </View>

      {filteredDataSource !== null && (
        <View style={{ flex: 1 }}>
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={newLayoutProvider}
            rowRenderer={itemView}
          />
        </View>
      )}

      {filteredDataSource === null && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
    </View>
  );
};

export default SearchPage;
