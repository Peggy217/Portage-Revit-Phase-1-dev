import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import TourButtons from "./TourButtons";
import { ContentfulDataContext } from "../ContentfulContext";
import Favorites from "./Favorites";
import styles from "../styles/PlacesStyle";
import MapView from "react-native-maps";
import Playsound from "./Playsound";
import { Linking, Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";

// Handles the main page view for places
export default function Places({ route, navigation }) {
  const delta = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
  // Stores the number that controls how big the map display is.
  const [minZoomLevel, setMinZoomLevel] = useState();
  //Sets the state  for passing the data to the route when we navigate to it
  const { Id, newTourId, currentIndex } = route.params;
  // Gets the articles, people, and cultures from context and finds
  // the correct ones for display on the page
  const { articles } = useContext(ContentfulDataContext);
  const { people: peoples } = useContext(ContentfulDataContext);
  const { cultures } = useContext(ContentfulDataContext);

  // Gets the specific place that matches the id of the one that was clicked in the place list view
  const article = articles.find((article) => article.id === Id);
  //Gets the people that is associated with the article
  if (article !== null) {
    var people = peoples.filter((person) =>
      article.people_id.includes(person.id)
    );
  }

  //Gets the culture that is associated with the article
  const culture = cultures.filter((culture) =>
    article.culture_id.includes(culture.id)
  );

  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  // Index tracks the pagination on the active dot index
  const [index, setIndex] = useState(0);
  // References the carousel to the pagination so that they are linked together
  const isCarousel = useRef(null);
  // Sets the navigation title to the article title
  useEffect(() => {
    navigation.setOptions({ title: article.title });
  }, []);

  //Gets the latitude and longitude of location and redirects user to their map application
  const openMap = async (latitude, longitude, label = "MyLabel") => {
    const scheme = `${Platform.OS === "ios" ? "maps" : "geo"}:0,0?q=`;
    const link = Platform.select({
      ios: `${scheme}${label}@${latitude},${longitude}`,
      android: `${scheme}${latitude},${longitude}(${label})`,
    });

    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.imageContain}>
            <Carousel
              sliderWidth={window.width}
              itemWidth={window.width * 1}
              ref={isCarousel}
              activeSlideAlignment={"start"}
              data={article.images}
              inactiveSlideShift={0}
              onSnapToItem={(index) => {
                setIndex(index);
              }}
              useScrollView={true}
              renderItem={(url) => {
                return (
                  <Image source={{ uri: url.item }} style={styles.image} />
                );
              }}
            />
            <Pagination
              dotsLength={article.images.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: "rgba(0, 0, 0, 0.92)",
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
          </View>
          <>
            <View style={{ flexDirection: "row" }}>
              <Favorites itemId={article.id} />
              <TourButtons
                currentIndex={currentIndex}
                newTourId={newTourId}
                navigation={navigation}
              />
            </View>

            {culture.length > 0 && (
              <View style={styles.cultureContainer}>
                {culture.map((culture) => (
                  <TouchableOpacity
                    key={culture.id}
                    onPress={() => {
                      navigation.push("Cultures", {
                        Id: culture.id,
                      });
                    }}
                  >
                    <Text style={styles.culture}>{culture.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View>
              <Text style={styles.title}>{article.title}</Text>
              {article.audio.length > 0 && (
                <View style={styles.audioView}>
                  <Text style={styles.audioTitle}>
                    Listen to {article.audiotitle}
                  </Text>
                  <Playsound soundId={article.id} />
                </View>
              )}
            </View>
            <Text style={styles.content}>{article.description}</Text>
            {articles
              .filter((article) => {
                return article.id === Id;
              })
              .map((link, index) => (
                <View style={styles.mapBorder} key={index}>
                  <MapView
                  provider="google"
                    style={styles.map}
                    onMapReady={() => {
                      setMinZoomLevel(14);
                    }}
                    minZoomLevel={minZoomLevel}
                    initialRegion={{
                      ...link.location,
                      ...delta,
                    }}
                  >
                    <MapView.Marker
                      key={index}
                      coordinate={link.location}
                      title={link.title}
                    />
                  </MapView>
                </View>
              ))}
            <View>
              <TouchableOpacity
                onPress={() =>
                  openMap(
                    article.location.latitude,
                    article.location.longitude,
                    article.title
                  )
                }
                style={styles.locationButton}
              >
                <Text style={{ fontSize: 16, paddingRight: 5 }}>
                  Get Directions
                </Text>
                <Entypo name="location" size={28} color="black" />
              </TouchableOpacity>
            </View>
            {people.length > 0 && (
              <View style={styles.relevantPeopleContainer}>
                <Text style={styles.peopleTitle}>
                  Relevant Historical Figures
                </Text>
                <View>
                  {people.map((person) => (
                    <TouchableOpacity
                      key={person.id}
                      onPress={() => {
                        navigation.push("Peoples", {
                          Id: person.id,
                        });
                      }}
                    >
                      <Text style={styles.linkPeople}>{person.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
