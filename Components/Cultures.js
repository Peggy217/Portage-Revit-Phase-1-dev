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
import styles from "../styles/CulturesStyle";
import Favorites from "./Favorites";
// Handles the main page view for culture
export default function Culture({ route, navigation }) {
  //Sets the state  for passing the data to the route when we navigate to it
  const { Id } = route.params;
  // Gets the articles, people, and cultures from context and finds
  // the correct ones for display on the page
  const { articles } = useContext(ContentfulDataContext);
  const { people: peoples } = useContext(ContentfulDataContext);
  const { cultures } = useContext(ContentfulDataContext);

  //Gets the specific culture that matches the id of the one that was clicked in the culture list view
  const culture = cultures.find((culture) => culture.id === Id);
  //Gets the article that is associated with the culture
  const article = articles.filter((article) =>
    culture.site_id.includes(article.id)
  );
  //Gets the people that is associated with the culture
  const people = peoples.filter((person) =>
    culture.people_id.includes(person.id)
  );

  // Discovers screen size and sets "window" to {width, height}
  const window = useWindowDimensions();
  // Index tracks the pagination on the active dot index
  const [index, setIndex] = useState(0);
  // References the carousel to the pagination so that they are linked together
  const isCarousel = useRef(null);
  // Sets the navigation title to the article title
  useEffect(() => {
    navigation.setOptions({ title: culture.title });
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
              data={culture.images} //  person.images
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
              dotsLength={culture.images.length}
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
            <Favorites itemId={culture.id} />
            <View>
              <Text style={styles.title}>{culture.title}</Text>
            </View>
            <Text style={styles.content}>{culture.description}</Text>
            {article.length > 0 && (
              <View>
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
