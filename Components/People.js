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
import Favorites from "./Favorites";
import styles from "../styles/PeopleStyle";
// Handles the main page view for people
export default function People({ route, navigation }) {
  //Sets the state  for passing the data to the route when we navigate to it
  const { Id } = route.params;
  // Gets the articles, people, and cultures from context and finds
  // the correct ones for display on the page
  const { articles } = useContext(ContentfulDataContext);
  const { people: peoples } = useContext(ContentfulDataContext);
  const { cultures } = useContext(ContentfulDataContext);

  // Gets the specific people that matches the id of the one that was clicked in the people list view
  const people = peoples.find((person) => person.id === Id);
  // Gets the article that is associated with the people
  const article = articles.filter((article) =>
    people.site_id.includes(article.id)
  );
  // Gets the culture that is associated with the people
  const culture = cultures.filter((culture) =>
    people.culture_id.includes(culture.id)
  );

  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  // Index tracks the pagination on the active dot index
  const [index, setIndex] = useState(0);
  // References the carousel to the pagination so that they are linked together
  const isCarousel = useRef(null);
  // Sets the navigation title to the article title
  useEffect(() => {
    navigation.setOptions({ title: people.title });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.scroll}>
          <View style={styles.imageContain}>
            <Carousel
              sliderWidth={window.width}
              itemWidth={window.width * 1}
              ref={isCarousel}
              activeSlideAlignment={"start"}
              data={people.images} //  person.images
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
              dotsLength={people.images.length}
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
            <Favorites itemId={people.id} />
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
              <Text style={styles.title}>{people.title}</Text>
            </View>
            <Text style={styles.content}>{people.description}</Text>
            {article.length > 0 && (
              <View style={styles.relevantSiteContainer}>
                <Text style={styles.articleTitle}>
                  Relevant Historical Sites
                </Text>
                <View>
                  {article.map((article) => (
                    <TouchableOpacity
                      key={article.id}
                      onPress={() => {
                        navigation.push("Places", {
                          Id: article.id,
                        });
                      }}
                    >
                      <Text style={styles.linkArticle}>{article.title}</Text>
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
