import { useState, useEffect } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

const Home = () => {
  const [sound, setSound] = useState();
  const [clap, setClap] = useState();
  const [snare, setSnare] = useState();

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/kick.mp3")
    );

    const clap = await playClap();
    const snare = await playSnare();

    setSound(sound);

    console.log("Playing Sound");
    await playa(sound, clap, snare);
  };

  const playa = async (kick, c, s) => {
    console.log("whassup");
    await c.playAsync();
    await s.playAsync();
    await kick.playAsync();
  };

  const playClap = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/clap.mp3")
    );

    setClap(sound);

    return sound;
  };

  const playSnare = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/snare.mp3")
    );

    setSnare(sound);

    return sound;
  };

  const playAll = async () => {
    await playSound();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    return clap
      ? () => {
          console.log("Unloading Sound");
          clap.unloadAsync();
        }
      : undefined;
  }, [clap]);

  useEffect(() => {
    return snare
      ? () => {
          console.log("Unloading Sound");
          snare.unloadAsync();
        }
      : undefined;
  }, [snare]);
  return (
    <View>
      <Text>Hello</Text>
      <TouchableOpacity
        style={{ backgroundColor: "#FFC0CB" }}
        onPressIn={playSound}
      >
        <Text>Press to start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
