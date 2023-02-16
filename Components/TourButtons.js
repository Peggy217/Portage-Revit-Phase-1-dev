import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ContentfulDataContext } from "../ContentfulContext";
import styles from "../styles/TourButtonStyle";

// Handles the tour button functions
const TourButtons = ({ newTourId, currentIndex, navigation }) => {
  // Gets the tours from context and finds
  // the correct ones for display on the page
  const { tours } = useContext(ContentfulDataContext);
  // Stores the tour contentful data
  const [tour, setTour] = useState({});
  // Used to track the index of the location that is covered in the tour
  const [indexIncrease, setIndexIncrease] = useState(0);

  // UseEffect that sets the tour as long as theres a tour going on and tracks the current location the user is on in the tour
  useEffect(() => {
    if (newTourId !== undefined) {
      const tour = tours.find((tour) => tour.id === newTourId);
      setTour(tour);

      if (currentIndex < tour.article?.length) {
        setIndexIncrease(currentIndex + 1);
      }
    }
  }, []);

  return (
    <>
      {tour.article && (
        <View style={styles.buttonContainer}>
          <View>
            {indexIncrease < tour.article?.length && (
              <TouchableOpacity
                style={styles.nextLocation}
                onPress={() => {
                  navigation.push("Places", {
                    Id: tour.article_id[indexIncrease],
                    currentIndex: indexIncrease,
                    newTourId: newTourId,
                  });
                }}
              >
                <Text style={styles.nextLocationText}>Next Location</Text>
              </TouchableOpacity>
            )}
            {indexIncrease === tour.article?.length && (
              <TouchableOpacity
                style={styles.nextLocation}
                onPress={() => {
                  navigation.replace("TourList");
                }}
              >
                <Text style={styles.nextLocationText}>Finish Tour</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default TourButtons;
