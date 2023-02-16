import React, { useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContentfulDataContext } from "../../ContentfulContext";
import { distance, formatDistanceAsString } from "./Distance";
import styles from "../../styles/MapStyle";

// Handles the default map view.
export default function Map({ navigation, route}) {
  // Gets the articles from context and finds the correct display for the page
  const { articles } = useContext(ContentfulDataContext);
  // Boolean statement that controls if user location agreed to shared location
  const [location, setLocation] = useState(false);
  // Stores the map default location when it loads up
  const [region, setRegion] = useState();
  // Stores the number that controls how big the map display is
  const [minimumMapZoomLevel, setMinimumMapZoomLevel] = useState();
  // Stores the userLocation
  const [locationLatitude, setLocationLatitude] = useState();
  const [locationLongitude, setLocationLongitude] = useState();
  //Stores the article data for places
  const [locationData, setLocationData] = useState([]);
  //Used to toggle the modals
  const [modalOpen, setModalOpen] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  //Stores the information for the specific site that is clicked on in the map
  const [modalInfo, setModalInfo] = useState({
    location: { latitude: [0] },
    images: [],
  });
  // Hardcoded icon image.
  const [image, setImage] = useState([{ image: require("./Icons/you.png") }]);

  // Gets the users current location if granted access and sets the map display accordingly
  //If user doesnt grant access to location, redirects back to explore page and displays notification that informs the user
  useEffect(() => {
    (async () => {
      let { status } = route.params;
      if (status === "granted") {
        setLocation(true);
        let userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocationLatitude(userLocation.coords.latitude);
        setLocationLongitude(userLocation.coords.longitude);
        setImage(image);
        let region = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(region);

        const locationData = articles;

        locationData.sort((a, b) => {
          return (
            distance(
              a.location.latitude,
              a.location.longitude,
              userLocation.coords.latitude,
              userLocation.coords.longitude
            ) -
            distance(
              b.location.latitude,
              b.location.longitude,
              userLocation.coords.latitude,
              userLocation.coords.longitude
            )
          );
        });

        setLocationData(locationData);
      }
    })();
  }, []);

  //Stores the specific historic site data when user cliccks on marker and displays modal
  function onMarkerClick(link) {
    setModalInfo(link);
    setModalToggle(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOpen(false)}
      >
        <TouchableOpacity onPressOut={() => setModalOpen(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.viewModalContainer}>
              <View style={styles.linkContainer}>
                <MaterialIcons
                  name="close"
                  size={16}
                  style={styles.modalToggle}
                  onPress={() => setModalOpen(false)}
                />
                <Text style={styles.nearbyTitle}>NEARBY PLACES</Text>
                <FlatList
                  horizontal={false}
                  data={image}
                  style={styles.linkview}
                  renderItem={() =>
                    locationData.map((link) => (
                      <TouchableOpacity
                        key={link.id}
                        onPress={() => {
                          onMarkerClick(link);
                          setModalOpen(false);
                          setModalToggle(true);
                        }}
                      >
                        <Image
                          source={require("./Icons/you.png")}
                          style={styles.image}
                        />
                        <Text style={styles.title}>
                          {link.title +
                            " (" +
                            formatDistanceAsString(
                              distance(
                                link.location.latitude,
                                link.location.longitude,
                                locationLatitude,
                                locationLongitude
                              )
                            ) +
                            ")"}
                        </Text>
                      </TouchableOpacity>
                    ))
                  }
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <MapView
        style={styles.map}
        showsUserLocation={location}
        provider="google"
        showsMyLocationButton={false}
        onMapReady={() => {
          setMinimumMapZoomLevel(16);
        }}
        minZoomLevel={minimumMapZoomLevel}
        initialRegion={region}
      >
        {locationData.map((link) => (
          <MapView.Marker
            key={link.id}
            coordinate={link.location}
            title={link.title}
            onPress={() => onMarkerClick(link)}
          />
        ))}
      </MapView>

      <Modal
        visible={modalToggle}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalToggle(false)}
      >
        <TouchableOpacity onPressOut={() => setModalToggle(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.previewModalContainer}>
              <View>
                <MaterialIcons
                  name="close"
                  size={20}
                  style={styles.modalToggle}
                  onPress={() => setModalToggle(false)}
                />
                <View>
                  <Image
                    source={{ uri: modalInfo.images[0] }}
                    style={styles.previewImage}
                  />
                  <Text style={styles.previewTitle}>
                    {modalInfo.title} (
                    {formatDistanceAsString(
                      distance(
                        modalInfo?.location.latitude,
                        modalInfo?.location.longitude,
                        locationLatitude,
                        locationLongitude
                      )
                    )}
                    )
                  </Text>
                  <Text style={styles.previewText}>
                    {modalInfo.description?.substring(0, 240)}...
                  </Text>
                  <TouchableOpacity
                    style={styles.previewContainer}
                    onPress={() => {
                      navigation.navigate("Places", {
                        Id: modalInfo.id,
                      });
                      setModalToggle(false);
                    }}
                  >
                    <Text style={styles.previewContainerText}>Explore</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionsView}
          activeOpacity={0.8}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.optionsText}>View Nearby Locations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsView}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("TourList")}
        >
          <Text style={styles.optionsText}>Start a Tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
