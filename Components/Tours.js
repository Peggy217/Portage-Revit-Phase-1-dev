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
import { ContentfulDataContext } from "../ContentfulContext";
import styles from "../styles/ToursStyle";

// Handles the main page view for tours
export default function Tours({ route, navigation }) {
  // Gets the tours from context and finds
  // the correct ones for display on the page
  const { tours } = useContext(ContentfulDataContext);
  //Sets the state for passing the data to the route when we navigate to it
  const { Id } = route.params;
  // Gets the articles from context and finds
  // the correct ones for display on the page
  const { articles } = useContext(ContentfulDataContext);
  const newTourId = Id;
  // Gets the specific tour that matches the id of the one that was clicked in the tour list view
  const tour = tours.find((tour) => tour.id === Id);
  // Gets the article that is associated with the tour
  const article = articles.filter((article) =>
    tour.article_id.includes(article.id)
  );

  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  // Index tracks the pagination on the active dot index
  const [index, setIndex] = useState(0);
  // References the carousel to the pagination so that they are linked together
  const isCarousel = useRef(null);
  // Sets the navigation title to the article title
  useEffect(() => {
    navigation.setOptions({ title: tour.title });
  }, []);

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
              data={tour.images} //  person.images
              inactiveSlideShift={0}
              style={styles.carousel}
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
              dotsLength={tour.images.length}
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
            <View>
              <Text style={styles.title}>{tour.title}</Text>
            </View>
            <Text style={styles.content}>{tour.description}</Text>
            {article.length > 0 && (
              <View>
                <Text style={styles.historicalSiteTitle}>
                  List of locations covered in the tour
                </Text>
                <View>
                  {article.map((article, index) => (
                    <TouchableOpacity
                      key={article.id}
                      onPress={() => {
                        navigation.navigate("Places", {
                          Id: tour.article_id[index],
                        });
                      }}
                    >
                      <Text style={styles.historicalSiteLinks}>
                        {tour.article[index]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            <View>
              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => {
                  navigation.navigate("Places", {
                    Id: tour.article_id[index],
                    test: "test",
                    currentIndex: index,
                    tourLength: tour.article.length,
                    newTourId: newTourId,
                  });
                }}
              >
                <Text style={styles.tourText}>Start a Tour</Text>
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
