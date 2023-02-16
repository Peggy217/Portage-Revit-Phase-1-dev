import React, { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { ContentfulDataContext } from "../ContentfulContext";
import { Audio } from "expo-av";
import { Icon } from "@rneui/themed";
import styles from "../styles/PlaysoundStyle";
import Slider from "@react-native-community/slider";
import { useIsFocused } from "@react-navigation/native";

//Handles the functions related to playing audio recordings
export default function Playsound({ soundId }) {
  // Audio states
  const AUDIO_PLAYING = "playing";
  const AUDIO_STOPPED = "stopped";
  const AUDIO_LOADING = "loading";
  // Gets the articles from context and finds
  // the correct ones for display on the page
  const { articles } = useContext(ContentfulDataContext);
  // Gets the specific audio recording of the place that matches the id of the one that was clicked in the place list view
  const article = articles.find((article) => article.id === soundId);
  //Stores the audio recording that is related to the place that is being viewed
  const [playbackInstance, setPlaybackInstance] = useState(null);
  // Stores the current audio position that is a number between 0 and 1
  const [audioposition, setAudioposition] = useState(0);
  // Stores the playback instance that holds the duration and position of the audio recording  // Stores the playback instance that holds the duration and position of the audio recording
  const [playbackStatus, setPlaybackStatus] = useState(null);
  //Used to change the audio state
  const [audioState, setAudioState] = useState(AUDIO_STOPPED);
  //Determines whether the user is still on the article that is being viewed
  const isFocused = useIsFocused();

  //Icons that hold the audio state
  const button = {
    playing: (
      <Icon
        name="stop"
        type="font-awesome"
        size={30}
        onPress={() => {
          stopRemoteSound();
        }}
      />
    ),
    stopped: (
      <Icon
        name="play"
        type="font-awesome"
        size={30}
        onPress={() => {
          playRemoteSound();
        }}
      />
    ),
    loading: <ActivityIndicator size={30} color={"black"} />,
  };

  // Gets the current audio position when audio is playing
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPlaybackStatus(status);
      setAudioposition(status.positionMillis / status.durationMillis);
    }
  };

  // Updates the current audio position when slider gets altered
  const scrubAudio = (position) => {
    if (playbackInstance != null && playbackStatus.isPlaying) {
      playbackInstance.playFromPositionAsync(
        position * playbackStatus.durationMillis
      );
    }
  };

  // Loads the audio and plays it
  const playRemoteSound = async () => {
    setAudioState(AUDIO_LOADING);

    if (playbackInstance === null) {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: article.audio[0] },
        { progressUpdateIntervalMillis: 1000, shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setPlaybackInstance(sound);
      setPlaybackStatus(status);
      await sound.playAsync();
    } else {
      await playbackInstance.playAsync();
    }

    setAudioState(AUDIO_PLAYING);
  };

  // Stops the audio
  const stopRemoteSound = async () => {
    if (playbackInstance !== null || audioposition === 1) {
      await playbackInstance.stopAsync();
    }
    setAudioState(AUDIO_STOPPED);
    setAudioposition(0);
  };

  // Unloads sound
  useEffect(() => {
    return playbackInstance
      ? () => {
          playbackInstance.unloadAsync();
        }
      : undefined;
  }, [playbackInstance]);

  // Stops the audio recording when user navigates to another page or when the audio recording ends
  useEffect(() => {
    stopRemoteSound();
  }, [isFocused, audioposition === 1]);

  return (
    <View style={styles.container}>
      {button[audioState]}
      <Slider
        style={{ width: 340, marginLeft: 10, marginVertical: -5 }}
        minimumValue={0}
        maximumValue={1}
        value={audioposition}
        minimumTrackTintColor="black"
        maximumTrackTintColor="black"
        onSlidingComplete={scrubAudio}
      />
    </View>
  );
}
